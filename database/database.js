// Notes
/*
    - API requires "npx expo install expo-sqlite"
    - [Error: Error code : database is locked] -> Hold power button and restart AVD
        Normally, you'd have to manually restart the "database service" on the OS
    - DB file location at the projectDirectory: /data/data/host.exp.exponent/files/SQLite/db-name

*/

import { useState } from 'react'
import { Button, Text, View } from 'react-native';

import style from './stylesheets.js';

import * as SQLite from 'expo-sqlite';
import stylesheets from './stylesheets.js';

export default function App() {

    const DATABASE_NAME = "todo";

    const TABLE_DDL = "CREATE TABLE IF NOT EXISTS task (\
        id INTEGER PRIMARY KEY NOT NULL, \
        label TEXT NOT NULL, \
        descr TEXT NOT NULL, \
        status_id tinyint(3) NOT NULL DEFAULT '0', \
    );";

    const VIEW_DML = "SELECT * FROM task;";

    const VIEW_SORTED_DML = "SELECT * FROM task ORDER BY id ASC;";

    const CLEAR_DML = "DELETE FROM task WHERE id > 0;";

    const EXAMPLE_DATA = [
        {"label": "Homework", "descr": "Project 2", "status": 1 },
        {"label": "Homework", "descr": "Project 3", "status": 1 },
        {"label": "Homework", "descr": "Final Exam", "status": 3 },
    ];

    const INSERT_DML = "INSERT INTO task (label, descr, status_id) values ";

    const [databaseLog, setDatabaseLog] = useState('');

    const runDatabaseTransaction = async (queryCallback) => {
        let databaseContext = null;
        try {
            databaseContext = SQLite.openDatabase(DATABASE_NAME);
            await databaseContext.transactionAsync(queryCallback, false);
        }
        catch (ex) {
            console.log(ex);
        }
        finally {
            databaseContext?.closeAsync();
        }
    }

    const createTable = () => {
        let query = async transaction => {
            let result = await transaction.executeSqlAsync(TABLE_DDL, []);
            console.log(result);
            setDatabaseLog("Table created");
        }

        runDatabaseTransaction(query);
    }

    const populateTable = () => {

        //clearTable(); // This soft-locks the app

        let insertQuery = "INSERT INTO task (label, descr, status_id) values ";
        let queryArguments = [];

        EXAMPLE_DATA.forEach(item => {
            INSERT_DML += "(?, ?, ?),";

            queryArguments.push(item.name);
            queryArguments.push(item.price);
        });

        insertQuery = insertQuery.substring(0, INSERT_DML.length - 1); // remove trailing comma (,)
        console.log(insertQuery);
        console.log(queryArguments);

        let query = async transaction => {
            let result = await transaction.executeSqlAsync(insertQuery, queryArguments);
            console.log(result);
            setDatabaseLog(`${result.rowsAffected} rows added`);
        }

        runDatabaseTransaction(query);
    }

    const viewTable = () => {
        let query = async transaction => {
            let result = await transaction.executeSqlAsync(VIEW_DML, []);
            console.log(result);
            let log = "";
            result.rows.forEach(item => log += `${item.name}: $${item.price}\n`);
            if (!log) log = "No data";
            setDatabaseLog(log);
        }

        runDatabaseTransaction(query);
    }

    const viewSortedTable = () => {
        let query = async transaction => {
            let result = await transaction.executeSqlAsync(VIEW_SORTED_DML, []);
            console.log(result);
            let log = "";
            result.rows.forEach(item => log += `${item.name}: $${item.price}\n`);
            if (!log) log = "No data";
            setDatabaseLog(log);
        }

        runDatabaseTransaction(query);
    }

    const clearTable = () => {
        let query = async transaction => {
            let result = await transaction.executeSqlAsync(CLEAR_DML, []);
            console.log(result);
            setDatabaseLog("Table cleared");
        }

        runDatabaseTransaction(query);
    }

    return <View style={stylesheets.appView}>
        <Text style={style.title}>SQLite Demo</Text>
        <View style={stylesheets.button}><Button title="Create Table" onPress={createTable}></Button></View>
        <View style={stylesheets.button}><Button title="Populate Table" onPress={populateTable}></Button></View>
        <View style={stylesheets.button}><Button title="View Table" onPress={viewTable}></Button></View>
        <View style={stylesheets.button}><Button title="View Table (Sorted)" onPress={viewSortedTable}></Button></View>
        <View style={stylesheets.button}><Button title="Clear Table" onPress={clearTable}></Button></View>
        <View style={stylesheets.frame}><Text style={stylesheets.text}>{databaseLog}</Text></View>
    </View>;
}