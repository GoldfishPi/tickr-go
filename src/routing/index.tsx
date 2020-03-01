import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContext } from "../providers/UserProvider";
import useLinking from './linking';
import { SplashScreen } from 'expo';
import { AuthRoutes } from "./AuthRoutes";

const Stack = createStackNavigator();
export function Routing() {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false);
    const [initialNavigationState, setInitialNavigationState] = React.useState();
    const { loginToken } = useContext(UserContext);

    const containerRef = React.useRef();
    const { getInitialState } = useLinking(containerRef);

    React.useEffect(() => {
        (async () => {
            SplashScreen.preventAutoHide();
            const [ navState ] = await Promise.all([
                getInitialState(),
                loginToken()
            ]);
            setInitialNavigationState(navState);
            SplashScreen.hide();
            setLoadingComplete(true);
        })();
    }, []);

    if(!isLoadingComplete)
        return null;

    return (<React.Fragment>
            <NavigationContainer 
                ref={containerRef} 
                initialState={initialNavigationState}
            >
                <Stack.Navigator>
                    <Stack.Screen 
                        name="Root"
                        component={AuthRoutes} 
                        options={{headerShown:false}}/>
                </Stack.Navigator>
            </NavigationContainer>
    </React.Fragment>);
}
