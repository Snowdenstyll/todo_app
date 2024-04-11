
import React, { useEffect, useState } from 'react';
import {
  View, Text, Platform, TextInput, Button, SafeAreaView, FlatList, StyleSheet, Image
} from 'react-native';
import AddButton from '../components/AddButton';
import TaskList from '../components/TaskList';
import stylesheet from '../stylesheet';
import { getData, createTable, populateTable, viewTable, viewSortedTable, clearTable, getDatabaseLog, dropTable } from '../database/database';

const Home = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  async function loadData() {
    var data = getData();
    console.log(JSON.parse(data));
    //setTasks(response);
  }

  useEffect(() => {
    createTable,
    populateTable,
    loadData();
  }, []);

  //loadData();
  /* useEffect(() => {
    getData((data) => {
      if (data) {
        var tasksArr = [];
        data = JSON.parse(data);
        data.foreach(element => {
          tasksArr.push({'label': element.label, 'description': element.descr, 'status_id': element.status_id });
        });
        setTasks(tasksArr);
      } else {
        console.log("No data");
      }
    });
  },[]); */

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen {tasks}</Text>
      <AddButton navigation={navigation} />
      <View style={stylesheet.button}><Button title="Create Table" onPress={createTable}></Button></View>
      <View style={stylesheet.button}><Button title="Populate Table" onPress={populateTable}></Button></View>
      <View style={stylesheet.button}><Button title="View Table" onPress={viewTable}></Button></View>
    </View>
  );
};

export default Home;