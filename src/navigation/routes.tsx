import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/Login";
import { View, StyleSheet } from "react-native";
import {Platform} from "react-native";
import { AlertsScreen } from '../screens/Alerts';
import { GlobalContexts } from "../hooks";

const Stack = createStackNavigator();

const Header = () => {
    return Platform.OS === 'android' ?  
            (<View style={ styles.header}></View>) :
            (<View></View>)
}

export const Routes = () => {
    return (
        <View style={styles.container}>
            <GlobalContexts>
                <Header />
                <Stack.Navigator screenOptions={{headerShown:false}}>
                    <Stack.Screen 
                        name="Login"
                        component={LoginScreen}
                    />
                    <Stack.Screen 
                        name="Alerts"
                        component={AlertsScreen}
                    />
                </Stack.Navigator>
            </GlobalContexts>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height:35,
        backgroundColor:'black',
    },
    container: {
        flex:1,
    }
});
