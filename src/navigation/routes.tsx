import React, { useContext } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/Login";
import { View, StyleSheet } from "react-native";
import {Platform} from "react-native";
import { HomeRoutes } from "./Home";
import { UserContext } from "../providers/UserProvider";

const Stack = createStackNavigator();


export const Routes = () => {
    const { user } = useContext(UserContext);
    return (
            <Stack.Navigator screenOptions={{headerShown:false}}>
                { user === null ?
                (
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                    />
                )
                    :
                (
                <Stack.Screen
                    name="Home"
                    component={HomeRoutes}
                />
                )
                }
            </Stack.Navigator>
        )
}

