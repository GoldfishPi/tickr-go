import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import useLinking from "./src/navigation/linking";
import { Routes } from "./src/navigation/routes";
import { ApplicationProvider } from "@ui-kitten/components";
import {light, dark, mapping} from "@eva-design/eva";

const Stack = createStackNavigator();

export default function App() {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false);
    const [initialNavigationState, setInitialNavigationState] = React.useState();
    const containerRef = React.useRef();
    const { getInitialState } = useLinking(containerRef);

    React.useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {

                // Load our initial navigation state
                setInitialNavigationState(await getInitialState());

            } catch(e) {
                console.warn(e)
            } finally {
                setLoadingComplete(true);
            }
        }
        loadResourcesAndDataAsync();
    }, []);
    if(!isLoadingComplete)
        return null
    return (
        <ApplicationProvider mapping={mapping} theme={dark}>
        <View style={styles.container}>
            <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
                <Stack.Navigator>
                    <Stack.Screen 
                        name="Root"
                        component={Routes} 
                        options={{headerShown:false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </View>
        </ApplicationProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
});
