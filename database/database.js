
import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = "todo";
const TABLE_DDL = "CREATE TABLE IF NOT EXISTS task (\
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, \
        label TEXT NOT NULL, \
        descr TEXT NOT NULL, \
        status_id INTEGER NOT NULL DEFAULT 0 \
    );";
const VIEW_DML = "SELECT * FROM task;";
const VIEW_SORTED_DML = "SELECT * FROM task ORDER BY id ASC;";
const CLEAR_DML = "DELETE FROM task WHERE id > 0;";
const EXAMPLE_DATA = [
    { "label": "Homework", "descr": "Project 2", "status_id": "1" },
    { "label": "Homework", "descr": "Project 3", "status_id": "2" },
    { "label": "Homework", "descr": "Final Exam", "status_id": "3" },
];
const INSERT_DML = "INSERT INTO task (label, descr, status_id) values ";
const DROP_TABLE = "DROP TABLE task;";

//const [databaseLog, //setDatabaseLog] = useState('');

const runDatabaseTransaction = async (queryCallback) => {
    let databaseContext = null;
    try {
        databaseContext = SQLite.openDatabase("todo.db");
        await databaseContext.transactionAsync(queryCallback, false);
        console.log(queryCallback);
    }
    catch (ex) {
        console.log(ex);
    }
    finally {
        databaseContext?.closeAsync();
    }
}

const dropTable = () => {
    runDatabaseTransaction(DROP_TABLE);
}

const createTable = () => {
    let query = async transaction => {
        let result = await transaction.executeSqlAsync(TABLE_DDL, []);
        console.log(result);
        //setDatabaseLog("Table created");
    }

    runDatabaseTransaction(query);
}

const populateTable = async () => {

    //clearTable(); // This soft-locks the app

    let insertQuery = "INSERT INTO task (label, descr, status_id) values ";
    let queryArguments = [];

    EXAMPLE_DATA.forEach(item => {
        insertQuery += "(?, ?, ?),";

        queryArguments.push(item.label);
        queryArguments.push(item.descr);
        queryArguments.push(item.status_id);
    });

    insertQuery = insertQuery.substring(0, insertQuery.length - 1); // remove trailing comma (,)

    let query = async transaction => {
        let result = await transaction.executeSqlAsync(insertQuery, queryArguments);
        console.log(result.rowsAffected);
        //setDatabaseLog(`${result.rowsAffected} rows added`);
    }

    runDatabaseTransaction(query);
}

const viewTable = () => {
    let query = async transaction => {
        let result = await transaction.executeSqlAsync(VIEW_DML, []);
        console.log(result);
        let log = "";
        result.rows.forEach(item => log += `${item.label}: ${item.descr} : ${item.status_id}\n`);
        if (!log) log = "No data";
        //setDatabaseLog(log);
    }

    runDatabaseTransaction(query);
}

const viewSortedTable = () => {
    let query = async transaction => {
        let result = await transaction.executeSqlAsync(VIEW_SORTED_DML, []);
        console.log(result);
        let log = "";
        result.rows.forEach(item => log += `${item.label}: ${item.descr} : ${item.status_id}\n`);
        if (!log) log = "No data";
        //setDatabaseLog(log);
    }

    runDatabaseTransaction(query);
}

const clearTable = () => {
    let query = async transaction => {
        let result = await transaction.executeSqlAsync(CLEAR_DML, []);
        console.log(result);
        //setDatabaseLog("Table cleared");
    }

    runDatabaseTransaction(query);
}

const getData = async () => {
    let data = [];
    try {
        let result = await new Promise((resolve, reject) => {
            let query = async transaction => {
                let result = await transaction.executeSqlAsync(VIEW_DML, []);
                resolve(result.rows);
            };
            runDatabaseTransaction(query);
        });

        data = Array.from(result);
        console.log("GETDATA after tx: " + data.length);
        return data;
    } catch (error) {
        console.error("Error in getData:", error);
        return []; // Return empty array or handle error accordingly
    }
}


export { createTable, populateTable, viewTable, viewSortedTable, clearTable, getData, dropTable }

/* return <View style={stylesheets.appView}>
    <Text style={style.title}>SQLite Demo</Text>
    <View style={stylesheets.button}><Button title="Create Table" onPress={createTable}></Button></View>
    <View style={stylesheets.button}><Button title="Populate Table" onPress={populateTable}></Button></View>
    <View style={stylesheets.button}><Button title="View Table" onPress={viewTable}></Button></View>
    <View style={stylesheets.button}><Button title="View Table (Sorted)" onPress={viewSortedTable}></Button></View>
    <View style={stylesheets.button}><Button title="Clear Table" onPress={clearTable}></Button></View>
    <View style={stylesheets.frame}><Text style={stylesheets.text}>{databaseLog}</Text></View>
    </View>; */
