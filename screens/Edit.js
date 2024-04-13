
import {
    View, Text, Platform, TextInput, Button, FlatList, StyleSheet, Image, Alert
} from 'react-native';
import React, { useState } from 'react';
import stylesheet from '../stylesheet';
import { Dropdown } from 'react-native-element-dropdown';
import { viewTable, updateTask } from '../database/database';

const Edit = (props) => {
    var task = props.route.params.task;
    const [label, setLabel] = useState(task.label);
    const [description, setDescription] = useState(task.descr);

    const handleLabelChange = (text) => {
        setLabel(text);
    };

    const handleDescriptionChange = (text) => {
        setDescription(text);
    };

    const data = [
        { label: 'Draft', value: '1' },
        { label: 'Todo', value: '2' },
        { label: 'Doing', value: '3' },
        { label: 'Done', value: '4' },
    ];

    // Dropdown
    const [value, setValue] = useState(data[task.status_id - 1].value);
    const [isFocus, setIsFocus] = useState(false);

    //alert
    const showSuccessAlert = () => {
        Alert.alert(
            'Item Updated',
            'The item has been Updated successfully!',
            [
                {
                    text: 'OK',
                    onPress: () => console.log('OK Pressed'),
                    style: 'default',
                },
            ],
            { cancelable: false }
        );
    };

    const showErrorAlert = (props) => {
            Alert.alert(
                'Error',
                'Missing input for ' + props + '! Please fill in all fields.',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('OK Pressed'),
                        style: 'default',
                    },
                ],
                { cancelable: false }
            );
    };

    const handleSubmit = () => {
        let missingValues = [];
        if (label.length === 0) { missingValues.push('Label'); }
        if (description.length === 0) { missingValues.push('Description'); }
        if (value === null) { missingValues.push('Status'); }
        if (missingValues.length === 0) {
            let id = task.id;
            updateTask(id, label, description, value);
            showSuccessAlert();
        } else {
            showErrorAlert(JSON.stringify(missingValues).replace(/[\[\]"]+/g, ' '));
        }
    };

    return (
        <View style={stylesheet.flexView}>
            <Text style={stylesheet.baseText}>Label</Text>
            <TextInput
                style={stylesheet.input}
                keyboardType='default'
                placeholder='Enter Label Here'
                title='Label'
                value={label}
                onChangeText={handleLabelChange}
            />
            <Text style={stylesheet.baseText}>Description</Text>
            <TextInput
                style={stylesheet.input}
                keyboardType='default'
                placeholder='Enter To Do Description Here'
                title='Description'
                value={description}
                onChangeText={handleDescriptionChange}
            />
            <Text style={stylesheet.baseText}>Status</Text>
            <Dropdown
                style={[stylesheet.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={stylesheet.placeholderStyle}
                selectedTextStyle={stylesheet.selectedTextStyle}
                inputSearchStyle={stylesheet.inputSearchStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                }}
            />
            <Text style={stylesheet.baseText}></Text>
            <Button
                style={stylesheet.button}
                title="Submit"
                onPress={handleSubmit}
            />
        </View>
    );
};

export default Edit;