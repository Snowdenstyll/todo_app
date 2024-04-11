
import React, { useEffect, useState } from 'react';
import {
  View, Text, Platform, TextInput, Button, SafeAreaView, FlatList, StyleSheet, Image
} from 'react-native';
//import { getData, createTable, populateTable, viewTable, viewSortedTable, clearTable, getDatabaseLog, dropTable } from "../database/database";

import AddButton from '../components/AddButton';
import TaskList from '../components/TaskList';
import stylesheet from '../stylesheet';
import { getData, createTable, populateTable, viewTable, viewSortedTable, clearTable, getDatabaseLog, dropTable } from '../database/database';

const Home = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    getData((data) => {
      if (data) {
        data = JSON.parse(data);
        data.forEach(element => {
          tasks.push({'label': element.label, 'description': element.descr, 'status_id': element.status_id });
        });
        setTasks(tasks);
        console.log(tasks.length);
      } else {
        console.log('No data');
      }
    });
  },[tasks]);

 /*  const Item = ({ task }) => (
    <View>
      <Text style={stylesheet.label}>wtf</Text>
    </View>
  ); */


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen{tasks}</Text>

      {/* <FlatList
        data={tasks}
        renderItem={({ task }) => <Item task={task} />}
        keyExtractor={(task) => task.id}
      /> */}
      <AddButton navigation={navigation} />
      <View style={stylesheet.button}><Button title="Create Table" onPress={createTable}></Button></View>
      <View style={stylesheet.button}><Button title="Populate Table" onPress={populateTable}></Button></View>
      <View style={stylesheet.button}><Button title="View Table" onPress={viewTable}></Button></View>
    </View>
  );
};

export default Home;