import React, { useContext } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/Login";
import { UserContext } from "../providers/UserProvider";
import { HomeRoutes } from "./HomeRoutes";

const Stack = createStackNavigator();


export const AuthRoutes = () => {
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

