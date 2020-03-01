import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Platform, View, StyleSheet } from "react-native";
import { HeaderComponent } from "../components/ui/header.component";
import { DrawerComponent } from "../components/ui/drawer.component";
import { AlertsScreen } from "../screens/Alerts";
import { DashboardScreen } from "../screens/Dashboard";

const DrawerNav = createDrawerNavigator();

const ScreenSpacer = () => {
    return Platform.OS === 'android' ?  
        (<View style={ styles.header}></View>) :
        (<View></View>)
}

export const HomeRoutes = () => {

    const [ openToggle, toggleOpen ] = useState(false);

    return (<>
    <ScreenSpacer />
    <HeaderComponent onPress={() => toggleOpen(!openToggle)} />
    <DrawerNav.Navigator 
        drawerContent={(props:any) => (<DrawerComponent {...props} openToggle={openToggle} />)} 
        open={ true} 
    >
        <DrawerNav.Screen 
            name="Alerts" 
            component={AlertsScreen}
        />
        <DrawerNav.Screen
            name="Dashboard"
            component={DashboardScreen}
        />
    </DrawerNav.Navigator>
</>);
}
const styles = StyleSheet.create({
    header: {
        height:35,
        backgroundColor:'black',
    },
});
