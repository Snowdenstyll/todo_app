
import React, { useEffect, useState } from 'react';
import {
    View, Text, Platform, TextInput, Button, SafeAreaView, FlatList, StyleSheet, Image
} from 'react-native';
import AddButton from "../components/AddButton";
import { getData, createTable, populateTable, viewTable, viewSortedTable, clearTable, getDatabaseLog, dropTable } from "../database/database";
import TaskList from "../components/TaskList";

const Home = ({ navigation }) => {
  useEffect(() => {
    createTable();
    populateTable();
    getData();
  }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home Screen</Text>
            <TaskList></TaskList>
            <AddButton navigation={navigation} />
        </View>
    );
};

export default Home;