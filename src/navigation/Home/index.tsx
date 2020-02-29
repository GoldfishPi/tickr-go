import React, { useState, useEffect, useContext } from 'react';
import { createDrawerNavigator, useIsDrawerOpen } from '@react-navigation/drawer';
import { AlertsScreen } from "../../screens/Alerts";
import { Platform, View, StyleSheet } from "react-native";
import { 
    TopNavigation, 
    TopNavigationAction,
    Icon,
    Text,
    Drawer,
} from '@ui-kitten/components';

const DrawerNav = createDrawerNavigator();

const ScreenSpacer = () => {
    return Platform.OS === 'android' ?  
        (<View style={ styles.header}></View>) :
        (<View></View>)
}

const LeftAction = ({ onPress }) => (
    <TopNavigationAction
        icon={style => (<Icon {...style} name="menu-outline" />)}
        onPress={ onPress }
    />
)
const Header = ({ onPress }) => {
    return (<TopNavigation 
        leftControl={ LeftAction({ onPress }) }
        alignment="center"
    />);

}

const DrawerContent = ({ navigation, state, open }) => {

    const [ init, setInit ] = useState(false);

    useEffect(() => {
        if(init)
            navigation.toggleDrawer();
        else
            setInit(true);
    }, [open]);

    const onSelect = (index:number) => {
        navigation.navigate(state.routeNames[index]);
    };
    return (
        <Drawer
            data={state.routeNames.map((r:string) => ({ title:r }))}
            selectedIndex={state.index}
            onSelect={onSelect}
        />
    );
}

export const HomeRoutes = () => {

    const [ openToggle, toggleOpen ] = useState(false);

    return (<>
    <ScreenSpacer />
    <Header onPress={() => toggleOpen(!openToggle)} />
    <DrawerNav.Navigator 
        drawerContent={props => (<DrawerContent {...props} open={openToggle} />)} 
        open={ true} 
    >
        <DrawerNav.Screen 
            name="Alerts" 
            component={AlertsScreen}
        />
    </DrawerNav.Navigator>
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
