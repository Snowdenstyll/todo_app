
import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = "todo_v2";
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
    const db = SQLite.openDatabase("todo_v2");
    return db;
}

const db = openDatabase();

const runDatabaseTransaction = async (queryCallback) => {
    try {
        databaseContext = SQLite.openDatabase("todo_v2");
        response = await databaseContext.transactionAsync(queryCallback, false);
    } catch (ex) {
        console.log(ex);
    } finally {
        databaseContext?.closeAsync();
    }
    return response;
}

const dropTable = () => {
    runDatabaseTransaction(DROP_TABLE);
}

const createTable = () => {
    let query = async transaction => {
        let result = await transaction.executeSqlAsync(TABLE_DDL, []);
        console.log(result);
    }

    runDatabaseTransaction(query);
}

const populateTable = async (callback) => {
    console.log("populating table");

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
        try {
            let result = await transaction.executeSqlAsync(insertQuery, queryArguments);
            console.log(result.rowsAffected);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    callback = runDatabaseTransaction(query);

    return callback;
}

const viewTable = async () => {
    console.log("View Table()");
    let resultArr = [];

    let query = async transaction => {
        try {
            result = await transaction.executeSqlAsync(VIEW_DML, []);
            result.rows.forEach(item => {
                resultArr.push(item); // Push each item into resultArr
            });
            //console.log("resultArr: ", resultArr);
        } catch (error) {
            console.error('Error executing SQL query:', error);
        }
    }

    // Call runDatabaseTransaction and await the result
    try {
        await runDatabaseTransaction(query);
    } catch (error) {
        console.error('Error running database transaction:', error);
    }

    return resultArr;
    //return result;
    //return callback;
}

const updateTask = (id, label, descr, status_id) => {
    if (id === null) return;
    let query = [];
    let params = [];
    if (label !== null) { query.push("label = ?"); params.push(label); }
    if (descr !== null) { query.push("descr = ?"); params.push(descr); }
    if (status_id !== null) { query.push("status_id = ?"); params.push(status_id); }

    let queryStr = "update task set " + query.join(", ");
    params.push(id);
    console.log(queryStr);
    console.log(params);

    db.transaction(
        (tx) => {
            tx.executeSql(
               queryStr + " where id = ?;",
                params,
                (_, { rowsAffected }) => rowsAffected > 0 ? console.log("Row Update") : console.log("Row not updated"),
                (_, result) => console.log("Error UpdateTask: " + (result))
            );
        },
        (_, error) => {
            console.error('Failed to update data:', error);
        }
    );
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
    //if (db._closed) db = openDatabase();

    console.log("Calling GetData()");
    db.transaction(
        (tx) => {
            tx.executeSql(
                "SELECT * FROM task;",
                [],
                (_, { rows }) =>
                callback(JSON.stringify(rows._array)) //
                //callback(JSON.stringify(rows._array)) //callback(JSON.stringify(rows))
            );
        },
        (_, error) => {
            console.error('Failed to get data:', error);
        }
    );
    return callback;
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

export { createTable, populateTable, viewTable, viewSortedTable, clearTable, getData, dropTable, insertTask, updateTask }