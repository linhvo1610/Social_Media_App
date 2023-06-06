import * as React from 'react'
import { Button, TextInput, Text, View, StyleSheet, TouchableHighlight, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Hideo } from 'react-native-textinput-effects';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { API } from './API';
const Login = ({ navigation }) => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [status, setstatus] = useState()

    const doLogin = () => {
        // kiểm tra hợp lệ dữ liệu
        if (username.length == 0) {
            // thông báo:
            alert("Chưa nhập username")
            return;
        }
        if (password.length == 0) {
            // thông báo:
            alert("Chưa nhập password")
            return;
        }


        // url_check_login
        let url_check_login = API.login + username;


        fetch(url_check_login)
            .then((res) => {
                console.log(res);
                return res.json();

            })
            .then(async (res_login) => {
                if (res_login.length != 1) {
                    alert("Tài Khoản hoặc mật khẩu sai");
                    return;
                } else {
                    let objU = res_login[0];
                    if (objU.password == password) {
                        try {

                            await AsyncStorage.setItem("login", JSON.stringify(objU));
                            console.log(objU);
                            if (objU.status == 1) {
                                navigation.navigate('Home')
                                setusername("")
                                setpassword("")
                            } else {
                                navigation.navigate('HomeGuest')
                                setusername("")
                                setpassword("")
                            }



                        } catch (e) {
                            // saving error
                            console.log(e);
                        }

                    } else {
                        alert("Sai password");
                    }
                }


            })


    }


    const checkIfDisabled = () => {
        if (username.length ==0 || password.length==0) {
            
            return true;
        }
        else return false;
    }


    return (
        <View style={styles.container}>
            <Image style={{ width: '100%', height: 100, marginTop: 10 }} source={{ uri: 'https://img.freepik.com/free-vector/happy-tiny-people-near-huge-welcome-word-flat-illustration_74855-10808.jpg?w=996&t=st=1676654058~exp=1676654658~hmac=87d53232dfebaeb13e12df25a26fe29c55ba6df71098512ce9150f4771dbd3e5' }}></Image>

            <View style={{ marginTop: 30, width: '85%', height: 50, backgroundColor: '#b6cfdb', flexDirection: 'row', borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
                <View style={{
                    alignContent: 'center',
                    justifyContent: 'center', width: 50, borderRightWidth: 0.5,
                    flex: 2.5, marginRight: 10,
                    alignItems: 'center'
                }}>
                    <Icon name='person'
                        size={20} ></Icon>
                </View>
                <TextInput style={{ flex: 12 }} placeholder='Nhập tài khoản ' value={username} onChangeText={text => setusername(text)}></TextInput>
            </View>
            <View style={{ width: '85%', height: 50, backgroundColor: '#b6cfdb', flexDirection: 'row', marginBottom: 10, borderBottomLeftRadius: 6, borderBottomRightRadius: 6, borderTopWidth: 0.5, borderTopColor: 'gray' }}>
                <View style={{
                    alignContent: 'center',
                    justifyContent: 'center', width: 50, borderRightWidth: 0.5,
                    flex: 2.5, marginRight: 10,
                    alignItems: 'center'
                }}>
                    <Icon name='lock-closed'
                        size={20} ></Icon>
                </View>
                <TextInput style={{ flex: 12 }} secureTextEntry={true} placeholder='Nhập mật khẩu ' value={password} onChangeText={text => setpassword(text)}></TextInput>
            </View>
            {username.length==0 || password.length==0 ?
            <TouchableOpacity disabled={checkIfDisabled()}
                onPress={() => { doLogin() }}>
                <View style={{ width: 260, height: 30, backgroundColor: '#4eb4e6', borderRadius: 10 }}>
                    <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: '500', justifyContent: 'center', marginTop: 5, }}>Đăng Nhập</Text>
                </View>
            </TouchableOpacity>: <TouchableOpacity 
                onPress={() => { doLogin() }}>
                <View style={{ width: 260, height: 30, backgroundColor: '#4eb4e6', borderRadius: 10 }}>
                    <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: '500', justifyContent: 'center', marginTop: 5, color:'white' }}>Đăng Nhập</Text>
                </View>
            </TouchableOpacity> }
            <TouchableOpacity onPress={()=>{navigation.navigate('HomeT')}}>
                <Text style={{fontSize:15,fontWeight:'500',marginTop:6}}>Bỏ qua</Text>
            </TouchableOpacity> 


            <View style={{ marginTop: 110, width: '100%', marginBottom: 10 }}>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ borderTopWidth: 1, borderColor: 'black', width: 100, marginLeft: 40, marginTop: 10, marginRight: 5 }} />
                    <Text>Hoặc</Text>
                    <View style={{ borderTopWidth: 1, borderColor: 'black', width: 100, marginLeft: 5, marginTop: 10 }} />
                </View>

            </View>

            <TouchableOpacity onPress={() => { navigation.navigate('Register') }}>
                <View style={{ width: 260, height: 30, backgroundColor: '#85bde6', borderRadius: 10 }}>
                    <Text style={{ color: '#0b7abd', textAlign: 'center', fontSize: 15, fontWeight: '500', justifyContent: 'center', marginTop: 5, }}>Đăng Ký</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',


    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 60,
        marginBottom: 20
    },
    accountin: {

        margin: 10,

    },
    accountin1: {
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: -50,

    },
    register: {
        marginBottom: 150,
        flexDirection: 'row',
        color: 'white',

    },
    appButton: {
        padding: 12,
    },
    appButtonText: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    appButtonContainer: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: -50,
    },
    disabled:{
        color:'red'
    },
    buttonWrapper:{
        color:'blue'
    }

});