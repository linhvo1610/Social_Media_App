import *  as React from 'react'
import { Button, TextInput, Text, View, StyleSheet, Image, Alert } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hideo } from 'react-native-textinput-effects';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { API } from './API';

const Register = ({ navigation }) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const [fullname, setfullname] = useState('')
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [repassword, setrepassword] = useState('');
    const [phonenumber, setphonenumber] = useState('');
    const [email, setemail] = useState();
    const [image, setimage] = useState("")
    const [status, setstatus] = useState(0)
    const registerUser = () => {

        if (username.length == 0) {
            // thông báo:
            alert("Vui lòng nhập tài khoản")
            return;
        }
        if (password.length == 0) {
            // thông báo:
            alert("Vui lòng nhập mật khẩu")
            return;
        }
        if (repassword.length == 0) {
            // thông báo:
            alert("Vui lòng nhập lại mật khẩu")
            return;
        } if (fullname.length == 0) {
            // thông báo:
            alert("Vui lòng nhập họ tên")
            return;
        }
        if (phonenumber.length == 0) {
            // thông báo:
            alert("Vui lòng nhập số điện thoại")
            return;
        }
        if (email.length == 0) {
            // thông báo:
            alert("Vui lòng nhập email")
            return;
        }
        if (repassword != password ) {
            // thông báo:
            alert("Mật khẩu không trùng nhau")
            return;
        }
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === false){
            alert('Email Không đúng định dạng');
            return;
        }
        //1. Chuẩn bị dữ liệu:

        let objUsers = {
            fullname: fullname,
            username: username,
            password: password,
            repassword: repassword,
            phonenumber: phonenumber,
            email: email,
            status: status,
            image: image
        }


        //2. Gọi hàm fetch
        fetch(API.getlistuser, {
            method: 'POST', // POST: Thêm mới, PUT: Sửa, DELETE: xóa, GET: lấy thông tin
            headers: { // Định dạng dữ liệu gửi đi
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objUsers) // chuyển đối tượng SP thành chuỗi JSON
        })
            .then((response) => {
                console.log(response.status);
                // nếu log là 201 thì là tạo thành công
                if (response.status == 201)
                Alert.alert('Đăng ký', 'Đăng ký thành công', [
                    {
                      text: 'Cancel',
                    
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => navigation.navigate('Login')},
                  ]);


            })
            .catch((err) => {  // catch để bắt lỗi ngoại lệ
                console.log(err);
            });
        //3. Tạo nút bấm để gọi hàm thêm sản phẩm
    }

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <Icon style={{ flex: 2, marginBottom: 8 }}
                    name='arrow-back'
                    color={'white'}
                    onPress={() => { navigation.goBack() }}
                    size={30}></Icon>
                <Text style={{ flex: 16, fontSize: 30, fontWeight: 'bold', color: 'white', marginBottom: 10 }}>ĐĂNG KÝ</Text>
            </View>
            <View style={{ elevation: 5, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: 'white', width: '100%', alignItems: 'center' }}>
                <View style={{ marginTop: 20, width: '85%', height: 50, backgroundColor: '#b6cfdb', flexDirection: 'row', borderRadius: 6, marginBottom: 5 }}>
                    <View style={{
                        alignContent: 'center',
                        justifyContent: 'center', width: 50, borderRightWidth: 0.5,
                        flex: 2.5, marginRight: 10,
                        alignItems: 'center'
                    }}>
                        <Icon name='person'
                            size={20} ></Icon>
                    </View>
                    <TextInput style={{ flex: 12 }} maxLength={16} placeholder='Nhập tài khoản ' value={username} onChangeText={text => setusername(text)}></TextInput>
                </View>
                <View style={{ width: '85%', height: 50, backgroundColor: '#b6cfdb', flexDirection: 'row', borderRadius: 6, marginBottom: 5 }}>
                    <View style={{
                        alignContent: 'center',
                        justifyContent: 'center', width: 50, borderRightWidth: 0.5,
                        flex: 2.5, marginRight: 10,
                        alignItems: 'center'
                    }}>
                        <Icon name='lock-closed'
                            size={20} ></Icon>
                    </View>
                    <TextInput style={{ flex: 12 }} maxLength={16} secureTextEntry={true} placeholder='Nhập mật khẩu ' value={password} onChangeText={text => setpassword(text)}></TextInput>
                </View>
                <View style={{ width: '85%', height: 50, backgroundColor: '#b6cfdb', flexDirection: 'row', borderRadius: 6, marginBottom: 5 }}>
                    <View style={{
                        alignContent: 'center',
                        justifyContent: 'center', width: 50, borderRightWidth: 0.5,
                        flex: 2.5, marginRight: 10,
                        alignItems: 'center'
                    }}>
                        <Icon name='lock-closed'
                            size={20} ></Icon>
                    </View>
                    <TextInput style={{ flex: 12 }} maxLength={16} secureTextEntry={true} placeholder='Nhập lại mật khẩu ' value={repassword} onChangeText={text => setrepassword(text)}></TextInput>
                </View>
                <View style={{ width: '85%', height: 50, backgroundColor: '#b6cfdb', flexDirection: 'row', borderRadius: 6, marginBottom: 5 }}>
                    <View style={{
                        alignContent: 'center',
                        justifyContent: 'center', width: 50, borderRightWidth: 0.5,
                        flex: 2.5, marginRight: 10,
                        alignItems: 'center'
                    }}>
                        <Icon name='person-outline'
                            size={20} ></Icon>
                    </View>
                    <TextInput style={{ flex: 12 }} maxLength={255} placeholder='Nhập họ và tên ' value={fullname} onChangeText={text => setfullname(text)}></TextInput>
                </View><View style={{ width: '85%', height: 50, backgroundColor: '#b6cfdb', flexDirection: 'row', borderRadius: 6, marginBottom: 5 }}>
                    <View style={{
                        alignContent: 'center',
                        justifyContent: 'center', width: 50, borderRightWidth: 0.5,
                        flex: 2.5, marginRight: 10,
                        alignItems: 'center'
                    }}>
                        <Icon name='call'
                            size={20} ></Icon>
                    </View>
                    <TextInput style={{ flex: 12 }} maxLength={11} placeholder='Nhập số điện thoại ' value={phonenumber} onChangeText={text => setphonenumber(text)}></TextInput>
                </View>
                <View style={{ width: '85%', height: 50, backgroundColor: '#b6cfdb', flexDirection: 'row', borderRadius: 6, marginBottom: 5 }}>
                    <View style={{
                        alignContent: 'center',
                        justifyContent: 'center', width: 50, borderRightWidth: 0.5,
                        flex: 2.5, marginRight: 10,
                        alignItems: 'center'
                    }}>
                        <Icon name='mail'
                            size={20} ></Icon>
                    </View>
                    <TextInput style={{ flex: 12 }} maxLength={100} placeholder='Nhập email ' value={email} onChangeText={text => setemail(text)}></TextInput>
                </View>
                <View style={{ marginBottom: 25 }}>
                    <Button title='Đăng ký' onPress={() => { registerUser() }}></Button>
                </View>
            </View>




        </View>
    )
}
export default Register;
const styles = StyleSheet.create({

    container: {
        backgroundColor: '#657fc7',
        flex: 1,
        alignItems: 'center',
        lineHeight: 10,
        flexDirection: 'column'

    },
    content: {
        marginLeft: 10,
        marginRight: 10
    }
});