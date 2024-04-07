import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        width: 300,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    baseText: {
        fontWeight: 'bold',
        margin:10
    },
    innerText: {
        color: 'red',
    },
    flexView: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
    },
    dropdown: {
        width: 300,
        height: 40,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    button: {
        width: 300,
        height: 40,
        backgroundColor: 'blue',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    }
});
