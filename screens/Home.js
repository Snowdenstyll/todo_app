
import React, { useEffect, useState } from 'react';
import {
  View, Text, Platform, TextInput, Button, SafeAreaView, FlatList, StyleSheet, Image, Pressable, ScrollView
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import AddButton from '../components/AddButton';
import TaskList from '../components/TaskList';
import stylesheet from '../stylesheet';
import { createTable, populateTable, viewTable, viewSortedTable, clearTable, getDatabaseLog, dropTable } from '../database/database';

const Home = ({ navigation }) => {
  const [tasks, setTasks] = useState(null);

  const handleViewTable = async () => {
    try {
      const response = await viewTable();
      if (Array.isArray(response)) {
        setTasks(response);
      } else {
        console.log("not array");
      }
    } catch (ex) {
      console.log(ex);
    }
  }

 /*  useEffect(() => {
    //create table
    createTable;
    handleViewTable();
  }, []); */

  useFocusEffect(
    React.useCallback(() => {
      createTable;
      handleViewTable();
    }, [])
  );

  const Item = ({task}) => (
    <View>
      <Text>{task}</Text>
    </View>
  );

  const data = [
    { label: 'Draft', value: '1' },
    { label: 'Todo', value: '2' },
    { label: 'Doing', value: '3' },
    { label: 'Done', value: '4' },
  ];

  const getStatusLabel = (status_id) => {
    return data[status_id - 1].label;
  }
  // load the data

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={stylesheet.title}>TO DO List</Text>
      <View style={stylesheet.container}>
        <ScrollView style={stylesheet.scrollView}>
        {tasks !== null ?
          tasks.map((task, index) => (
            <Pressable
              key={task.id.toString()}
              onPress={() => {
                navigation.navigate('Edit', { task: task})
              }}>
              <Text style={stylesheet.item} key={task.id.toString()}>[{task.id}] {task.label} - {task.descr} - {getStatusLabel(task.status_id)}</Text>
            </Pressable>
          ))
          : (
            <Text>No tasks</Text>
            )}
          </ScrollView>
      </View>

      <AddButton navigation={navigation} />
      <View><Button title="Populate Table" onPress={populateTable}></Button></View>
      {/* <View style={stylesheet.button}><Button title="Create Table" onPress={createTable}></Button></View> */}
      {/* <View style={stylesheet.button}><Button title="View Table" onPress={handleViewTable}></Button></View> */}
      {/* <View style={stylesheet.button}><Button title="Get DATA" onPress={handleGetData}></Button></View> */}
    </View>
  );
};

export default Home;