import React, { 
    useState, 
    useEffect, 
    useContext,
    FC 
} from 'react';
import {
    Drawer,
    DrawerHeaderFooter,
    Toggle,
    Text
} from '@ui-kitten/components';
import { View } from "react-native";
import { lang } from "../../i18n";
import { ThemeContext } from "../../providers/ThemeProvider";
import { UserContext } from "../../providers/UserProvider";

interface props {
    navigation:any;
    state:any;
    openToggle:boolean;
}
export const DrawerComponent:FC<props> = ({ 
    navigation, 
    state, 
    openToggle 
}) => {

    const [ init, setInit ] = useState(false);
    const { logout } = useContext(UserContext);

    useEffect(() => {
        if(init)
            navigation.toggleDrawer();
        else
            setInit(true);
    }, [openToggle]);

    const onSelect = (index:number) => {
        navigation.navigate(state.routeNames[index]);
    };


    return (
        <Drawer
            data={state.routeNames.map((r:string) => ({ title:r }))}
            selectedIndex={state.index}
            onSelect={onSelect}
            header={DrawerHeader()}
            footer={DrawerFooter(logout)}
        />
    );
}

const DrawerHeader = () => {
    
    const { theme, setTheme } = useContext(ThemeContext);
    const onChangeTheme = (bool:boolean) => {
        if(bool) setTheme('dark')
        else setTheme('light');
    }
    return () => (<DrawerHeaderFooter
        title="Dark Theme"
        accessory={(style) => (
            <Toggle 
                {...style}
                checked={theme === 'dark'} 
                onChange={onChangeTheme}
            />
        )}
    />)
}

const DrawerFooter = (logout:any) => {
    return () => (
        <DrawerHeaderFooter
            onPress={ logout }
            accessory={(style) => (
                <View {...style}>
                    <Text >
                        { lang.logout }
                    </Text>
                </View>
            )}
        />
    );
}
