import React, { 
    useState, 
    useEffect, 
    useContext,
    FC 
} from 'react';
import {
    Drawer,
    DrawerHeaderFooter,
    Toggle
} from '@ui-kitten/components';
import { ThemeContext } from "../../hooks/theme";

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

    const { theme, setTheme } = useContext(ThemeContext);

    useEffect(() => {
        if(init)
            navigation.toggleDrawer();
        else
            setInit(true);
    }, [openToggle]);

    const onSelect = (index:number) => {
        navigation.navigate(state.routeNames[index]);
    };

    const onChangeTheme = (bool:boolean) => {
        if(bool) setTheme('dark')
        else setTheme('light');
    }

    return (
        <Drawer
            data={state.routeNames.map((r:string) => ({ title:r }))}
            selectedIndex={state.index}
            onSelect={onSelect}
            header={() => (<DrawerHeaderFooter
                title="Dark Theme"
                accessory={(style) => (
                    <Toggle 
                        checked={theme === 'dark'} 
                        onChange={onChangeTheme}/>
                )}
            />)}
        />
    );
}

