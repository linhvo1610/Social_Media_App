import * as React from 'react'
import { Button, TextInput, Text, View, StyleSheet, TouchableHighlight, StatusBar, TouchableOpacity, FlatList, Image, Share, Modal, ScrollView, RefreshControl, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sharing from 'expo-sharing';


import { API } from './API';
var dem = 0;
const Management = ({ navigation }) => {
    const [reloading, setreloading] = useState(false)
    const [counter, setcounter] = useState(dem)
    const reloadData = React.useCallback(() => {
        // xử lý công việc load lại dữ liệu đổ vào danh sách
        setreloading(true); // set trạng thái bắt đầu reload
        dem++;
        getListUsers();
        setcounter(dem);
        // mô phỏng đợi reload, nếu là reload từ server thật thì không cần viết lệnh dưới
        setTimeout(() => {
            setreloading(false); // sau 2s thì đổi trạng thái không rload nữa
        }, 2000);


    });

    const [data, setdata] = useState([]);

    const [id, setid] = useState();
    const [title, settitle] = useState();
    const [content, setcontent] = useState();
    const [img_source, setimg_source] = useState(null)
    const [userlogin, setuserlogin] = useState("")
    const [username, setusername] = useState()
    const [image, setimage] = useState()
    const [img_base64, setiimg_base64] = useState(null)
    const [userId, setuserId] = useState()
    const [isLoading, setisLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [status, setstatus] = useState()
    const [fullname, setfullname] = useState('')
    const [password, setpassword] = useState('');
    const [repassword, setrepassword] = useState('');
    const [phonenumber, setphonenumber] = useState('');
    const [email, setemail] = useState();
    const [userimage, setuserimage] = useState()

    useEffect(() => {
        const getData = async () => {

            try {
                const value = await AsyncStorage.getItem("login")
                console.log(value);
                if (value !== null) {
                    let parsed = JSON.parse(value)
                    setuserId(parsed.id)
                    setuserlogin(parsed.username)
                    setuserimage(parsed.image)
                    setstatus(parsed.status)

                }
            } catch (e) {
                // error reading value
                console.log(e);
            }

        }
        getData();
        getListUsers();
        return () => {

        }
    }, [])


    function UpdateUser() {
        let item = {
            id: id,
            username: username,
            password: password,
            repassword: repassword,
            fullname: fullname,
            phonenumber: phonenumber,
            email: email,
            image: image,
            status: status
        }
        console.warn("item", item)
        fetch(API.getlistuser + item.id, {
            method: 'PUT',
            headers: { // config data
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
            })
        })
    }

    function UpdateUserAdmin() {
        let item = {
            id: id,
            username: username,
            password: password,
            repassword: repassword,
            fullname: fullname,
            phonenumber: phonenumber,
            email: email,
            image: image,
            status: 1
        }
        console.warn("item", item)
        fetch(API.getlistuser + item.id, {
            method: 'PUT',
            headers: { // config data
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
            })
        })
    }

    function ReUpdateUserAdmin() {
        let item = {
            id: id,
            username: username,
            password: password,
            repassword: repassword,
            fullname: fullname,
            phonenumber: phonenumber,
            email: email,
            image: image,
            status: 0
        }
        console.warn("item", item)
        fetch(API.getlistuser + item.id, {
            method: 'PUT',
            headers: { // config data
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
            })
        })
    }

    const getListUsers = () => {
        fetch(API.getlistuser)
            .then((data_res) => {
                // convert to json
                return data_res.json();
            })
            .then((data_json) => {
                // log
                setdata(data_json);
                console.log(data_json);
            })
            .catch((err) => {
                // nếu xảy ra lỗi thì log lỗi
                console.log(err);
            }).finally(() => setisLoading(false));

    }

    renderItem = ({ item, index }) => {



        const checkIfDisabled = () => {
            if (item.status == 1) {

                return true;
            }
            else return false;
        }




        const XoaItem = () => {
            // if(! confirm ('Có đồng ý xóa không?') )
            //     return; 


            fetch(API.deleteuser + item.id, {
                method: 'DELETE', // POST: Thêm mới, PUT: Sửa, DELETE: xóa, GET: lấy thông tin
                headers: { // Định dạng dữ liệu gửi đi
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    console.log(response.status);
                    getListUsers()
                    // nếu status là 200 thì là xóa thành công
                    if (response.status == 200)
                        alert("Xóa thành công");

                })
                .catch((err) => {  // catch để bắt lỗi ngoại lệ
                    console.log(err);
                });
        }
        function SelectArticle() {
            setid(item.id);
            setusername(item.username);
            setfullname(item.fullname);
            setpassword(item.password);
            setrepassword(item.repassword);
            setphonenumber(item.phonenumber);
            setemail(item.email);
            setstatus(item.status);
            setimage(item.image);
        }
        function SelectUser() {
            setid(item.id);
            setusername(item.username);
            setfullname(item.fullname);
            setpassword(item.password);
            setrepassword(item.repassword);
            setphonenumber(item.phonenumber);
            setemail(item.email);
            setstatus(item.status);
            setimage(item.image);
        }
        const submit = () => {
            Alert.alert('Xóa người dùng', 'Bạn có muốn xóa người dùng này?', [
                {
                  text: 'Cancel',
                
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => XoaItem()},
              ]);
          
          }


        return (
            <View style={{ margin: 10, backgroundColor: 'white', elevation: 5, borderRadius: 8, padding: 10 }}>
                <View style={{ flexDirection: 'row' }}>

                    <Image style={{
                        width: 60, height: 60, marginRight: 5, marginTop: 3,
                        alignItems: 'center', borderRadius: 60, borderWidth: 1, borderColor: "black", backgroundColor: 'white'


                    }} source={{
                        uri: item.image,
                    }} ></Image>
                    <Text style={{
                        marginBottom: 10,
                        fontWeight: 'bold',
                        color: '#d63341',
                        fontSize: 15,
                        marginLeft: 8,
                        marginTop: 2,
                        flex: 8

                    }} > {item.username}</Text>



                   {item.username!="admin"? <TouchableOpacity style={{ flex: 1 }}  onPress={submit}>
                        <Icon
                            name='close-circle'
                            size={14}
                            color={'red'}
                        />
                    </TouchableOpacity> :null}
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => { SelectArticle(item.id); setModalVisible(true) }}>
                        <Icon
                            name='refresh-circle'
                            size={14}
                            color={'green'}
                        />
                    </TouchableOpacity>
                </View>


                <Text style={{ alignItems: 'center', width: '100%', textAlign: 'center', marginBottom: 8, fontSize: 18, fontWeight: '600' }}>{item.title}</Text>


                <View style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 5 }}>
                    <TouchableOpacity onPress={() => { SelectArticle(item.id); setModalVisible(true) }}>
                        <Text style={{ color: '#3874a1',fontSize:15,fontWeight:'bold' }}>Xem chi tiết</Text>
                    </TouchableOpacity>
                    {item.status==0?<TouchableOpacity onPress={()=>{SelectUser(item.id),UpdateUserAdmin()}}>
                        <Text style={{ color: 'green',fontSize:15,fontWeight:'bold',marginTop:5 }}>Cấp quyền admin</Text>
                    </TouchableOpacity>:null}
                    {item.status==1&&item.username!="admin"?<TouchableOpacity onPress={()=>{SelectUser(item.id),ReUpdateUserAdmin()}}>
                        <Text style={{ color: 'red',fontSize:15,fontWeight:'bold',marginTop:5 }}>Hủy quyền admin</Text>
                    </TouchableOpacity>:null}

                </View>
               
                <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, marginBottom: 10, marginTop: 10 }}>
                </View>






            </View>
        )

    }




    StatusBar.setHidden(true)
    return (
        <View style={styles.container}>

            <Text style={styles.status}>QUẢN LÝ NGƯỜI DÙNG</Text>
            <View style={styles.function}>
                <View style={{ width: '100%', backgroundColor: 'white', marginBottom: 5, borderBottomColor: '#d6d6d6', borderBottomWidth: 0.5 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 10, flexDirection: 'row' }}>
                            <Image style={{
                                width: 30, height: 30, marginRight: 5, marginTop: 3, marginLeft: 5,
                                alignItems: 'center', borderRadius: 60, borderWidth: 1, borderColor: "black", backgroundColor: 'white'


                            }} source={{
                                uri: userimage,
                            }} ></Image>
                            <Text style={{ fontSize: 15, marginTop: 10,marginBottom:20, color: '#3a80a6', fontWeight: '400' }}>Hello, {userlogin}!</Text>
                        </View>

                    </View>

                </View>


            </View>
            <View style={{ width: "100%", height: 350 }}>
                {isLoading ? <ActivityIndicator /> : (<FlatList refreshControl={
                    <RefreshControl refreshing={reloading}
                        onRefresh={reloadData} />}

                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => `key-${item.id}`}>
                </FlatList>
                )}

            </View>
            <View style={{
                width: "100%",
                position: "absolute",
                bottom: 0,
                backgroundColor: "white",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,

                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5
            }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {

                        setModalVisible(!modalVisible);
                    }}>
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.2)', width: '100%', height: '100%', marginTop: 10 }}>
                        <ScrollView style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white', elevation: 10, marginLeft: 8, borderRadius: 10, width: "95%", marginBottom: 50 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon
                                    name='arrow-back'
                                    size={30}
                                    color={'blue'}
                                    onPress={() => setModalVisible(!modalVisible)}
                                    style={{ flex: 2, marginTop: 6, marginLeft: 5 }}>

                                </Icon>

                                <Text style={{ flex: 20, fontWeight: 'bold', marginLeft: 35, marginTop: 10, fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: 'blue' }}>Chi tiết người dùng</Text>
                            </View>
                            <View>
                                <Text style={styles.titletextinput}>Tài Khoản:</Text>
                                <TextInput style={styles.textinput}
                                    placeholder='Nhập tên tài khoản' value={username} onChangeText={(text) => setusername(text)}></TextInput>
                                <Text style={styles.titletextinput}>Mật khẩu:</Text>
                                <TextInput style={{ borderWidth: 2, padding: 5, paddingLeft: 15, color: '#f7487c', fontWeight: 'bold', borderRadius: 6, width: "90%", borderColor: '#465b99', alignContent: 'center', alignItems: 'center', marginLeft: 12, marginBottom: 5 }}
                                    placeholder='Nhập mật khẩu' value={password} onChangeText={(text) => setpassword(text)}></TextInput>
                                <Text style={styles.titletextinput}>Mật khẩu:</Text>
                                <TextInput style={{ borderWidth: 2, fontWeight: 'bold', padding: 5, paddingLeft: 15, color: '#f7487c', borderRadius: 6, width: "90%", borderColor: '#465b99', alignContent: 'center', alignItems: 'center', marginLeft: 12, marginBottom: 5 }}
                                    placeholder='Nhập lại mật khẩu' value={repassword} onChangeText={(text) => setrepassword(text)}></TextInput>
                                <Text style={styles.titletextinput}>Họ tên:</Text>
                                <TextInput style={{ borderWidth: 2, padding: 5, fontWeight: 'bold', paddingLeft: 15, color: '#f7487c', borderRadius: 6, width: "90%", borderColor: '#465b99', alignContent: 'center', alignItems: 'center', marginLeft: 12, marginBottom: 5 }}
                                    placeholder='Nhập họ tên' value={fullname} onChangeText={(text) => setfullname(text)}></TextInput>
                                <Text style={styles.titletextinput}>Email:</Text>
                                <TextInput style={{ borderWidth: 2, padding: 5, fontWeight: 'bold', paddingLeft: 15, color: '#f7487c', borderRadius: 6, width: "90%", borderColor: '#465b99', alignContent: 'center', alignItems: 'center', marginLeft: 12, marginBottom: 5 }}
                                    placeholder='Nhập email' value={email} onChangeText={(text) => setemail(text)}></TextInput>
                                <Text style={styles.titletextinput}>Số Điện Thoại:</Text>
                                <TextInput style={{ borderWidth: 2, padding: 5, fontWeight: 'bold', paddingLeft: 15, color: '#f7487c', borderRadius: 6, width: "90%", alignContent: 'center', borderColor: '#465b99', alignItems: 'center', marginLeft: 12, marginBottom: 5 }}
                                    placeholder='Nhập số điện thoại' value={phonenumber} onChangeText={(text) => setphonenumber(text)}></TextInput>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'space-between' }}>

                                <View style={{ width: '100%', borderTopWidth: 0.5, marginTop: 12 }}></View>

                                <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10, backgroundColor: '#4b8abd', width: 110, borderRadius: 4, marginLeft: 100, marginBottom: 10 }} onPress={() => { UpdateUser(), setModalVisible(!modalVisible) }}>
                                    <Icon
                                        name='checkmark'
                                        size={30}
                                        color={'white'}

                                    >

                                    </Icon>
                                    <Text style={{ marginTop: 8, color: 'white', fontWeight: 'bold' }}>CẬP NHẬT</Text>
                                </TouchableOpacity>


                            </View>
                        </ScrollView>
                    </View>
                </Modal>
            </View>



        </View>
    )
}
export default Management;
const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems: 'center',


    },
    status: {
        width: '100%',
        backgroundColor: 'white',
        height: 30,
        color: 'blue',
        fontWeight: 'bold',
        alignContent: 'center',
        paddingTop: 10,
        textAlign: 'center'
    },
    appButton: {
        borderWidth: 1,
        borderColor: 'white'
    },
    appButtonText: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    appButtonContainer: {

        width: 160,


    },
    function: {
        flexDirection: 'row',

    },
    content: {
        width: '100%',
        height: '75%',
        backgroundColor: 'white',
        marginBottom: 10,
    },
    textStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 4,
        bottom: 0,
        color: 'white'
    }, centeredView: {
        // backgroundColor: rgba(255, 0, 0, 0.2),
    },
    textinput: {
        borderWidth: 2, fontWeight: 'bold', padding: 5, paddingLeft: 15, color: '#f7487c', borderRadius: 6, width: "90%", borderColor: '#465b99', alignContent: 'center', alignItems: 'center', marginLeft: 12, marginBottom: 5
    },
    titletextinput:{
        marginLeft: 12, fontWeight: 'bold', color: 'blue' ,marginBottom:5
    }
});