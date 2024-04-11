
import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = "todo_v1";
const TABLE_DDL = "CREATE TABLE IF NOT EXISTS task (\
        id INTEGER PRIMARY KEY NOT NULL, \
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

function openDatabase() {
    const db = SQLite.openDatabase("todo_v1");
    return db;
}

const db = openDatabase();

const runDatabaseTransaction = async (queryCallback) => {
    try {
        databaseContext = SQLite.openDatabase("todo_v1");
        response = await databaseContext.transactionAsync(queryCallback, false);
    } catch (ex) {
        console.log(ex);
    } finally {
        databaseContext?.closeAsync();
    }
}

const dropTable = () => {
    runDatabaseTransaction(DROP_TABLE);
}

const createTable = () => {
    //db = openDatabase();

    db.transaction((tx) => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS task (id INTEGER PRIMARY KEY NOT NULL, label TEXT NOT NULL, descr TEXT NOT NULL, status_id INTEGER DEFAULT 0);`,
            [],
            () => console.log("Table created"),
            (_, result) => console.log(result)
        );
    });

    //db.closeSync();
    /* let query = async transaction => {
        let result = await transaction.executeSqlAsync(TABLE_DDL, []);
        console.log(result);
        //setDatabaseLog("Table created");
    }

    runDatabaseTransaction(query); */
}

const populateTable = () => {
    var db = openDatabase();

    //clearTable(); // This soft-locks the app

    let queryArguments = [];
    let insertQuery = "INSERT INTO task (label, descr, status_id) values ";

    EXAMPLE_DATA.forEach(item => {
        insertQuery += "(?, ?, ?),";

        queryArguments.push(item.label);
        queryArguments.push(item.descr);
        queryArguments.push(item.status_id);
    });

    insertQuery = insertQuery.substring(0, insertQuery.length - 1); // remove trailing comma (,)
    console.log(insertQuery);
    console.log(queryArguments);

    db.transaction((tx) => {
        tx.executeSql(
            insertQuery,
            queryArguments,
            (_, { rowsAffected }) => rowsAffected > 0 ? console.log("Row inserted") : console.log("Row not inserted"),
            (_, result) => console.log("Error inserting row: " + (result))
        );
    });

    db.closeSync();


    /* let insertQuery = "INSERT INTO task (label, descr, status_id) values ";
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
        console.log(result);
    }

    runDatabaseTransaction(query); */
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
    db.transaction((tx) => {
        tx.executeSql(
            "drop table task;",
            [],
            () => console.log("Table dropped"),
            (_, message) => console.log(message)
        );
    });
    /* let query = async transaction => {
        let result = await transaction.executeSqlAsync(CLEAR_DML, []);
        console.log(result);
        //setDatabaseLog("Table cleared");
    }

    runDatabaseTransaction(query); */
}

const getData = (callback) => {
    //db = openDatabase();

    db.transaction(
        (tx) => {
            tx.executeSql(
                "SELECT * FROM task;",
                [],
                (_, { rows }) =>
                callback([JSON.stringify(rows._array)]) //
                //callback(JSON.stringify(rows._array)) //callback(JSON.stringify(rows))
            );
        },
        (_, error) => {
            console.error('Failed to get data:', error);
        }
    );

    //db.closeSync();
}

const insertTask = (label, descr, status_id) => {
    //db = openDatabase();

    db.transaction(
        (tx) => {
            tx.executeSql(
                "INSERT INTO task (label, descr, status_id) values (?, ?, ?);",
                [label, descr, status_id],
                (_, { rowsAffected }) => rowsAffected > 0 ? console.log("Row inserted") : console.log("Row not inserted"),
                (_, result) => console.log("Error insertTask: " + (result))
            );
        },
        (_, error) => {
            console.error('Failed to insert data:', error);
        }
    );

    //db.closeSync();
}

export { createTable, populateTable, viewTable, viewSortedTable, clearTable, getData, dropTable, insertTask }