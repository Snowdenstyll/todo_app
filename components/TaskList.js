
import React, { useEffect, useState } from 'react';
import {
    View, Text, Platform, TextInput, Button, SafeAreaView, FlatList, StyleSheet, Image
} from 'react-native';
import AddButton from "../components/AddButton";
import { getData, createTable, populateTable, viewTable, viewSortedTable, clearTable, getDatabaseLog, dropTable} from "../database/database";
import stylesheet from '../stylesheet';

const TaskList = (data) => {
    const [task, setTasks] = useState([]);

    useEffect(() => {
        setTasks(data);
     }, [])

    /* useEffect(() => {
        getData((data) => {
            if (data) {
                setTasks(data); // Update state with fetched data
                console.log(task.length);
            } else {
                console.log('No data');
            }
        });
    }, []); */

    const Item = ({item}) => (
        <View>
            <Text style={stylesheet.label}>{item['label']} {item['descr']}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>wtf {task.length}</Text>
            <FlatList
                data={task}
                renderItem={({item}) => <Item item={item} />}
                keyExtractor={(temp, index) => (index)}
            />
        </View>
    );
};

export default TaskList;