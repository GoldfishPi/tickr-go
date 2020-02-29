import React from 'react';
import {
    TopNavigation,
    TopNavigationAction,
    Icon,
} from '@ui-kitten/components';

const LeftAction = ({ onPress }) => (
    <TopNavigationAction
        icon={style => (<Icon {...style} name="menu-outline" />)}
        onPress={ onPress }
    />
)
export const HeaderComponent = ({ onPress }) => {
    return (<TopNavigation 
        leftControl={ LeftAction({ onPress }) }
        alignment="center"
    />);

}
