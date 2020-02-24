import React, { useContext } from 'react';
import { View, StyleSheet,KeyboardAvoidingView, Image } from 'react-native';
import { Button, Input, Text, Layout, useTheme } from "@ui-kitten/components";
import { messages } from "../i18n";
import { useMediaQuery } from "react-responsive";
import { api, authUser } from "../api";
import { UserContext } from "../hooks/auth";


const loginSequence = async () => {
    // const authed = await authUser(
    //     'app+fheb@tickr.com',
    //     'fhebTickr!'
    // );

    // console.log('we got authed?', authed);
}

const Login = () => {
    const msg = useContext(UserContext);
    return (
        <KeyboardAvoidingView style={{flex:1}} behavior="padding">
            <Layout style={{flex:1}}>
                <View style={styles.container}>
                    <View style={styles.logoContainer} >
                        <Logo />
                    </View>
                    <View>
                        <Input placeholder={ messages.email } textContentType="emailAddress" />
                        <Input placeholder={ messages.password } textContentType="password" secureTextEntry={true} />
                        <Button onPress={loginSequence} >{ messages.signIn }</Button>
                        <Button appearance="ghost" onPress={() => console.log('user context', msg)} >{ messages.signUp }</Button>
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
    const [apiWorks, setApiWorks] = React.useState('');
    React.useEffect(() => {
        const load = async () => {
            const res = await api.get('/');
            setApiWorks(res.data.msg);
        }
        load();
    }, []);

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
                    <Text category="p">{ apiWorks }</Text>
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
        backgroundColor:'#dfded6',
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
