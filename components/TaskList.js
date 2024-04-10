
import React, { useEffect, useState } from 'react';
import {
    View, Text, Platform, TextInput, Button, SafeAreaView, FlatList, StyleSheet, Image
} from 'react-native';
import AddButton from "../components/AddButton";
import { getData, createTable, populateTable, viewTable, viewSortedTable, clearTable, getDatabaseLog, dropTable} from "../database/database";

const TaskList = () => {
    const [task, setTasks] = useState([]);

    useEffect(() => {
        /* createTable(); // Create the table
        populateTable(); // Insert initial data
        getData(setTasks); */ // View the table
    }, []);

   /*  const Item = ({title}) => (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
      ); */

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{task.length}</Text>
        </View>
    );
};

export default TaskList;