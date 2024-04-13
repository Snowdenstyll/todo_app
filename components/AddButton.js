import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const AddButton = (props) => {
    return (
        <View style={{ marginTop:10 }}>
            <TouchableOpacity
                style={{
                    borderWidth: 1,
                    borderColor: 'red',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 70,
                    position: 'fixed',
                    bottom: 0,
                    right: 0,
                    height: 70,
                    marginBottom: 10,
                    marginRight:4,
                    float: 'right',
                    backgroundColor: 'red',
                    borderRadius: 40,
                }}
                onPress={() => { props.navigation.navigate('Add')}}
            >
                <Text style={{ color: "white", justifyContent: 'center' }}>Add New Task</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddButton;