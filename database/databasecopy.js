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

const DATABASE_NAME = "food";

const TABLE_DDL = "CREATE TABLE IF NOT EXISTS items (\
        id INTEGER PRIMARY KEY NOT NULL, \
        name TEXT NOT NULL, \
        price REAL\
    );";

const VIEW_DML = "SELECT * FROM items;";

const VIEW_SORTED_DML = "SELECT * FROM items ORDER BY price ASC;";

const CLEAR_DML = "DELETE FROM items WHERE id > 0;";

const EXAMPLE_DATA = [
    { "name": "potatos", "price": 1.99 },
    { "name": "bananas", "price": 3.31 },
    { "name": "beans", "price": 5.56 },
    { "name": "rice", "price": 12.05 },
    { "name": "oats", "price": 5.96 },
    { "name": "coffee", "price": 36.38 },
    { "name": "maple syrup", "price": 14.57 },
    { "name": "sea salt", "price": 2.29 },
];

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

    let insertQuery = "INSERT INTO items (name, price) values ";
    let queryArguments = [];

    EXAMPLE_DATA.forEach(item => {
        insertQuery += "(?, ?),";

        queryArguments.push(item.name);
        queryArguments.push(item.price);
    });

    insertQuery = insertQuery.substring(0, insertQuery.length - 1); // remove trailing comma (,)
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


export { createTable, populateTable, viewTable, viewSortedTable, clearTable }