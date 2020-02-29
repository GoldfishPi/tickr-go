import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AlertsScreen } from "../../screens/Alerts";
import { Platform, View, StyleSheet } from "react-native";
import { 
    TopNavigation, 
    TopNavigationAction,
    Icon,
    Text,
} from '@ui-kitten/components';

const Stack = createStackNavigator();

const ScreenSpacer = () => {
    return Platform.OS === 'android' ?  
        (<View style={ styles.header}></View>) :
        (<View></View>)
}

const LeftAction = () => (
    <TopNavigationAction
        icon={style => (<Icon {...style} name="menu-outline" />)}
    />
)
const Header = ({ scene }:any) => {
    return (<TopNavigation 
        title={scene.route.name} 
        leftControl={ LeftAction() }
        alignment="center"
    />);

}

export const HomeRoutes = () => {
    return (<>
    <ScreenSpacer />
    <Stack.Navigator screenOptions={{header:Header}}>
        <Stack.Screen 
            name="Alerts" 
            component={AlertsScreen}
        />
    </Stack.Navigator>
</>);
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
