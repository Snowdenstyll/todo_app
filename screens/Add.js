
import {
    View, Text, Platform, TextInput, Button, FlatList, StyleSheet, Image,
} from 'react-native';
import React, { useState } from 'react';
import stylesheet from '../stylesheet';
import { Dropdown } from 'react-native-element-dropdown';

const Add = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleTitleChange = (text) => {
        setTitle(text);
    };

    const handleDescriptionChange = (text) => {
        setDescription(text);
    };

    const handleSubmit = () => {
        // Use title and description for further processing
        console.log('Title:', title);
        console.log('Description:', description);
    };

    // Dropdown
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const data = [
        { label: 'Draft', value: '1' },
        { label: 'Todo', value: '2' },
        { label: 'Doing', value: '3' },
        { label: 'Done', value: '4' },
      ];

    return (
        <View style={stylesheet.flexView}>
            <Text style={stylesheet.baseText}>Title</Text>
            <TextInput
                style={stylesheet.input}
                keyboardType='default'
                placeholder='Enter Title Here'
                title='Title'
                value={title}
                onChangeText={handleTitleChange}
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
            <Button
                style={stylesheet.button}
                title="Submit"
                onPress={handleSubmit}
            />
        </View>
    );
};

export default Add;