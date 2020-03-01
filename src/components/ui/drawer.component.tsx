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
            footer={DrawerFooter}
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

const DrawerFooter = () => {
    return (
        <DrawerHeaderFooter
            accessory={(style) => (
                <View {...style}>
                    <Text>{ lang.logout }</Text>
                </View>
            )}
        />
    );
}
