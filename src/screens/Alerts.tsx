import React from "react";
import { View, StyleSheet, ScrollView } from "react-native"
import { Text, Layout, Card, CardHeader, List, ListItem, TabBar, TopNavigation } from "@ui-kitten/components"

const renderItem = ({ item, index}) => (
    <ListItem 
        onPress={() => {
            console.log(`${index} pressed`)
        }}
        title={ `${item.title} ${index+1}`} 
    />
);
export const AlertsScreen = () => {
    const data = new Array(8).fill({
        title:'Alert'
    });
    const activeHeader = () => (
        <CardHeader title="Active Alerts"/>
        );
    const enabledHeader = () => (
        <CardHeader title="Enabled Alerts"/>
        );
    return (
        <Layout style={{flex:1}}>
            <List
                data={data}
                renderItem={renderItem}
            />
        </Layout>
    )
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
