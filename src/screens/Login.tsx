import React, { useContext, useState } from 'react';
import { View, StyleSheet,KeyboardAvoidingView, Image } from 'react-native';
import { 
    Button, 
    Input, 
    Text, 
    Layout, 
    Spinner, 
    Modal, 
    Select,
    SelectOption
} from "@ui-kitten/components";
import { lang } from "../i18n";
import { useMediaQuery } from "react-responsive";
import { UserContext } from "../providers/UserProvider";

const selectOptions:SelectOption = [
    { text: 'spectrum' },
    { text: 'fh' },
];

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
const Login = ({ onLogin }:{onLogin:() => void}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [client ] = useState('spectrum');
    const [loading, setLoading] = useState(false);

    const { user, login } = useContext(UserContext);

    React.useEffect(() => {
        if(user)onLogin();
    }, [ user ]);


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
                            placeholder={ lang.email }
                            textContentType="emailAddress" 
                            value={ username }
                            onChangeText={ text => setUsername(text)} 
                        />
                        <Input 
                            placeholder={ lang.password } 
                            textContentType="password" 
                            secureTextEntry={true} 
                            value={ password }
                            onChangeText={ text => setPassword(text)}
                        />
                        <Button onPress={async () =>{ 
                            setLoading(true);
                            await login(username, password, client);
                            setLoading(false);
                        }} >{ lang.signIn }</Button>
                        <Button appearance="ghost" >{ lang.signUp }</Button>
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

    const onLogin = () => {
        navigation.navigate('Alerts');
    }

    if(isTablet) {
        return (
            <View style={panesStyles.panes}>
                <Layout style={panesStyles.leftPane}>
                    <Text category="h1" style={styles.title} >Empowering Agencies
                        and Brands</Text>
                    <Text category="h4"> Using Data to Achieve Transformational Results </Text>
                </Layout>
                <View style={panesStyles.rightPane}>
                    <Login onLogin={ onLogin } />
                </View>

            </View>
        );
    }

    return (
        <Layout style={{ flex:1}}>
            <Login onLogin={ onLogin } />
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
