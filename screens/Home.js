
import {
    View, Text, Platform, TextInput, Button, SafeAreaView, FlatList, StyleSheet, Image
} from 'react-native';
import AddButton from "../components/AddButton";

const Home = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home Screen</Text>
            <AddButton navigation={navigation} />
        </View>
    );
};

export default Home;