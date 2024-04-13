import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "../screens/Home";
import Add from "../screens/Add";
import Edit from "../screens/Edit";
import { View, Button, } from 'react-native';
import AddButton from "../components/AddButton";

const Stack = createStackNavigator();

function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        title: 'Branden Vongphakdy',
                    }}
                />
                <Stack.Screen
                    name="Add"
                    component={Add}
                    options={{ title: 'Add New Task' }}
                />
                <Stack.Screen
                    name="Edit"
                    component={Edit}
                    options={{ title: 'Edit Task' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigator;
