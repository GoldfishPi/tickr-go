import React, { useContext, useState, FC } from 'react';
import { View, StyleSheet,KeyboardAvoidingView, Image } from 'react-native';
import { Button, Input, Text, Layout, Spinner, Modal } from "@ui-kitten/components";
import { messages } from "../i18n";
import { useMediaQuery } from "react-responsive";
import { api, authUser } from "../api";


const loginSequence = async (
    username:string, 
    password:string, 
    client:string, 
    setLoading:(val:boolean) => void
) => {

    setLoading(true);
    const authed = await authUser(
        username,
        password,
        client
    );
    setLoading(false);

}

const LoadingSpinner = ({ loading }:{loading:boolean}) => {
    if(loading) {
        return (
            <Modal visible={ true } backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                <Spinner size="large"/>
            </Modal>
        );
    } 
    return (<></>)
}
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [client, setClient] = useState('fh');

    const [loading, setLoading] = useState(false);

    let test = 'test';

    return (
        <KeyboardAvoidingView style={{flex:1}} behavior="padding">
            <Layout style={{flex:1}}>
                <View style={styles.container}>
                    <View style={styles.logoContainer} >
                        <Logo />
                    </View>
                    <View>
                        <LoadingSpinner loading={ loading }  />
                        <Input 
                            placeholder={ messages.email }
                            textContentType="emailAddress" 
                            value={ username }
                            onChangeText={ text => setUsername(text)} 
                        />
                        <Input 
                            placeholder={ messages.password } 
                            textContentType="password" 
                            secureTextEntry={true} 
                            value={ password }
                            onChangeText={ text => setPassword(text)}
                        />
                        <Button onPress={() => loginSequence(username, password, client, setLoading)} >{ messages.signIn }</Button>
                        <Button appearance="ghost" >{ messages.signUp }</Button>
                    </View>
                </View>
            </Layout>
        </KeyboardAvoidingView>
    );
}


const Logo = () => {
    return (
        <Image source={require('../../assets/tickr-logo.png')} style={styles.logo}/>
        );
}

export const LoginScreen = ({ navigation }) => {
    // navigation.push('Alerts');
    const isTablet = useMediaQuery({
        maxWidth:11270
    });

    if(isTablet) {
        return (
            <View style={panesStyles.panes}>
                <Layout style={panesStyles.leftPane}>
                    <Text category="h1" style={styles.title} >Empowering Agencies
                        and Brands</Text>
                    <Text category="h4"> Using Data to Achieve Transformational Results </Text>
                </Layout>
                <View style={panesStyles.rightPane}>
                    <Login />
                </View>

            </View>
        );
    }

    return (
        <Layout style={{ flex:1}}>
            <Login />
        </Layout>
    )
}

const panesStyles = StyleSheet.create({
    panes: {
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    leftPane: {
        flexGrow:2,
        flex:1,
        // backgroundColor:'#dfded6',
        justifyContent:'center',
        alignItems:'center'
    },
    rightPane: {
        flexGrow:1
    },
    pane: {
        flexGrow:1,
        borderColor:'red',
        borderWidth:2,
        borderStyle:'solid',
    }
});

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal:50,
        justifyContent:'space-evenly',
    },
    title: {
        textAlign:'center',
        marginBottom:20,
    },
    logo: {
        width:150,
        height:150
    },
    logoContainer: {
        flex:1,
        flexGrow:0,
        flexDirection:'row',
        justifyContent:'center'
    }
});
