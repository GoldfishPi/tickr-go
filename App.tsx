import React, { useContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import useLinking from "./src/navigation/linking";
import { Routes } from "./src/navigation/routes";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import { light, dark, mapping } from "@eva-design/eva";
import { GlobalContexts } from "./src/hooks";
import { SplashScreen } from 'expo';
import { authCookie } from "./src/api";
import { UserContext } from "./src/hooks/user";
import { ThemeContext } from "./src/hooks/theme";

const Stack = createStackNavigator();

export default function App() {
    return (
        <GlobalContexts>
            <Providers />
        </GlobalContexts>
    );
}

function Providers() {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false);
    const [initialNavigationState, setInitialNavigationState] = React.useState();
    const { setUser } = useContext(UserContext);
    const { theme } = useContext(ThemeContext);
    const containerRef = React.useRef();
    const { getInitialState } = useLinking(containerRef);

    React.useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHide();

                // Load our initial navigation state
                setInitialNavigationState(await getInitialState());

                const user = await authCookie();
                if(user)setUser(user);

            } catch(e) {
                console.warn(e)
            } finally {
                setLoadingComplete(true);
                SplashScreen.hide();
            }
        }
        loadResourcesAndDataAsync();
    }, []);

    if(!isLoadingComplete)
        return (<View><Text>Loading lololol</Text></View>); 

    return (<React.Fragment>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={theme === 'dark' ? dark : light}>
            <View style={styles.container}>
                
                <NavigationContainer 
                    ref={containerRef} 
                    initialState={initialNavigationState}
                >
                    <Stack.Navigator>
                        <Stack.Screen 
                            name="Root"
                            component={Routes} 
                            options={{headerShown:false}}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        </ApplicationProvider>
    </React.Fragment>);
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
});
