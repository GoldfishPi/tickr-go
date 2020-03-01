import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native"
import { 
    Text, 
    Layout, 
    List, 
    ListItem, 
    Icon
} from "@ui-kitten/components"
import { fetchAlerts } from "../api/alerts";
import { UserContext } from "../providers/UserProvider";

const renderItem = ({ item, index}) => (
    <ListItem 
        onPress={() => {
            console.log(`${index} pressed`)
        }}
        icon={ item.is_triggered ? styles => (<Icon {...styles} name="alert-circle" fill="red" />) : null }
        title={ item.name } 
    />
);
export const AlertsScreen = () => {
    const { user } = useContext(UserContext);
    const [ alerts, setAlerts ] = useState();

    useEffect(() => {
        (async () => {
            const alerts:any[] = await fetchAlerts(user);
            const active = alerts.filter(a => a.is_triggered);
            const inactive = alerts.filter(a => !a.is_triggered);
            console.log('got alerts lol', alerts);
            setAlerts([
                ...active,
                ...inactive
            ]);
        })();
    }, []);

    return (<>
        <Layout style={{flex:1}}>
            <List
                data={alerts}
                renderItem={renderItem}
            />
        </Layout>
    </>)
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-evenly',
        margin:20,
    },
    card: {
        minWidth:200,
        maxWidth:500,
        flexGrow:1,
        marginBottom:20,
    }
});
