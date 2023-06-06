import * as React from 'react'
import { Button, TextInput, Text, View, StyleSheet, TouchableHighlight, ImageBackground, StatusBar, TouchableOpacity, FlatList, Image, Share, Modal, ScrollView, RefreshControl, Alert } from 'react-native'
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
const Home = ({ navigation }) => {
    const [reloading, setreloading] = useState(false)
    const [counter, setcounter] = useState(dem)
    const reloadData = React.useCallback(() => {
        // xử lý công việc load lại dữ liệu đổ vào danh sách
        setreloading(true); // set trạng thái bắt đầu reload
        dem++;
        getListArticle();
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
    const [username, setusername] = useState()
    const [image, setimage] = useState()
    const [imagelike, setimagelike] = useState()
    const [img_base64, setiimg_base64] = useState(null)
    const [img64, setimg64] = useState(null)
    const [likes, setlikes] = useState(0)
    const [userId, setuserId] = useState()
    const [isLoading, setisLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const customshare = () => {
        const shareOptions = {
            message: 'Test'
        }
        try {
            const ShareResponse = Share.open(shareOptions);
        } catch (error) {
            console.log();
        }
    }
    useEffect(() => {
        const getData = async () => {

            try {
                const value = await AsyncStorage.getItem("login")
                console.log(value);
                if (value !== null) {
                    let parsed = JSON.parse(value)
                    setuserId(parsed.id)
                    setusername(parsed.username)
                    setimage(parsed.image)

                }
            } catch (e) {
                // error reading value
                console.log(e);
            }

        }
        getData();
        getListArticle();
        return () => {

        }
    }, [])


    const pickImage = async () => {

        // Đọc ảnh từ thư viện thì không cần khai báo quyền
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3], // khung view cắt ảnh 
            quality: 1,
        });


        console.log(result);


        if (!result.canceled) {
            setimg_source(result.assets[0].uri);
            // chuyển ảnh thành base64 để upload lên json
            let _uri = result.assets[0].uri;  // địa chỉ file ảnh đã chọn
            let file_ext = _uri.substring(_uri.lastIndexOf('.') + 1); // lấy đuôi file


            FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' })
                .then((res) => {
                    // phải nối chuỗi với tiền tố data image
                    setiimg_base64("data:image/" + file_ext + ";base64," + res);
                    setimg64("data:image/" + file_ext + ";base64," + res);
                    console.log(img_base64);
                    // upload ảnh lên api thì dùng PUT có thể viết ở đây
                });


        }


    }
    function UpdateArticle() {
        let item = {
            id: id,
            title: title, content: content, image: img64, usersId: userId, likes: likes
        }
        console.warn("item", item)
        fetch(API.updatearticleadmin + item.id, {
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


    function UpdateLikeArticle() {
        let item = {
            id: id,
            title: title, content: content, image: img64, usersId: userId,
            likes: 1,
        }
        console.warn("item", item)
        fetch(API.updatearticleadmin + item.id, {
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

    function UpdateLikeArticle1() {
        let item = {
            id: id,
            title: title, content: content, image: img_base64, usersId: userId,
            likes: 0,
        }
        console.warn("item", item)
        fetch(API.updatearticleadmin + item.id, {
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

    const getListArticle = () => {
        fetch(API.getlistarticle)
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






        const onShare = async () => {
            try {
                const result = await Share.share({
                    title: item.title,
                    message: item.content,
                    url: item.image,

                });
                if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                        // shared with activity type of result.activityType
                    } else {
                        // shared
                    }
                } else if (result.action === Share.dismissedAction) {
                    // dismissed
                }
            } catch (error) {
                Alert.alert(error.message);
            }
        };

        const XoaItem = () => {
            // if(! confirm ('Có đồng ý xóa không?') )
            //     return; 


            fetch(API.deletearticleadmin + item.id, {
                method: 'DELETE', // POST: Thêm mới, PUT: Sửa, DELETE: xóa, GET: lấy thông tin
                headers: { // Định dạng dữ liệu gửi đi
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    console.log(response.status);
                    getListArticle()
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
            settitle(item.title);
            setcontent(item.content);
        }
        function SelectArticleLike() {
            setid(item.id);
            settitle(item.title);
            setimagelike(item.image);
            setcontent(item.content);
            setlikes(0)
        }
        function SelectArticleLike1() {
            setid(item.id);
            settitle(item.title);
            setimagelike(item.image);
            setcontent(item.content);
            setlikes(1)
        }

        const submit = () => {
            Alert.alert('Xóa bài viết', 'Bạn có muốn xóa bài viết này?', [
                {
                    text: 'Cancel',

                    style: 'cancel',
                },
                { text: 'OK', onPress: () => XoaItem() },
            ]);

        }


        return (
            <View style={{ margin: 10, backgroundColor: 'white', elevation: 5, borderRadius: 8, padding: 10 }}>
                <View style={{ flexDirection: 'row' }}>

                    <Image style={{
                        width: 40, height: 40, marginRight: 5, marginTop: 3,
                        alignItems: 'center', borderRadius: 60, borderWidth: 1, borderColor: "black", backgroundColor: 'white'


                    }} source={{
                        uri: item.users.image,
                    }} ></Image>
                    <Text style={{
                        marginBottom: 10,
                        fontWeight: 'bold',
                        color: '#d63341',
                        fontSize: 15,
                        marginLeft: 8,
                        marginTop: 2,
                        flex: 8

                    }} > {item.users.username}</Text>

                    <TouchableOpacity style={{ flex: 1 }} onPress={submit}>
                        <Icon
                            name='close-circle'
                            size={14}
                            color={'red'}
                        />
                    </TouchableOpacity>
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
                    <Text style={{ marginBottom: 5 }} > {item.content}</Text>


                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, borderColor: '#d6d6d6' }}>
                    <Image style={{
                        width: 270, height: 220,
                        margin: 5
                    }} source={{
                        uri: item.image,
                    }} ></Image>
                </View>
                <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, marginBottom: 10, marginTop: 10 }}>
                </View>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    {item.likes == 1 ? <TouchableOpacity onPress={() => { SelectArticleLike(item.id), UpdateArticle() }}>
                        <Icon
                            borderRadius={0}
                            name={'heart'}
                            color={'red'}
                            size={20}
                            style={{ marginRight: 20 }}
                        />
                    </TouchableOpacity> : <TouchableOpacity onPress={() => { SelectArticleLike1(item.id), UpdateArticle() }}>
                        <Icon
                            borderRadius={0}
                            name={'heart'}
                            color={'black'}
                            size={20}
                            style={{ marginRight: 20 }}
                        /></TouchableOpacity>}
                    <Icon
                        borderRadius={0}
                        name={'chatbox-outline'}
                        iconColor={''}
                        onPress={() => { navigation.navigate('Comment', { id: item.id }) }}
                        size={20}
                        style={{ marginRight: 20 }}
                    >

                    </Icon>
                    <Icon
                        size={20}
                        onPress={onShare}
                        name='arrow-redo-outline'>

                    </Icon>

                </View>




            </View>
        )

    }




    StatusBar.setHidden(true)
    return (
        <View style={styles.container}>

            <Text style={styles.status}>MẠNG XÃ HỘI</Text>
            <View style={styles.function}>
                <View style={{ width: '100%', backgroundColor: 'white', marginBottom: 5, borderBottomColor: '#d6d6d6', borderBottomWidth: 0.5 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 10, flexDirection: 'row' }}>
                            <Image style={{
                                width: 30, height: 30, marginRight: 5, marginTop: 3, marginLeft: 5,
                                alignItems: 'center', borderRadius: 60, borderWidth: 1, borderColor: "black", backgroundColor: 'white'


                            }} source={{
                                uri: image,
                            }} ></Image>
                            <Text style={{ fontSize: 15, marginTop: 10, color: '#3a80a6', fontWeight: '400' }}>Hello, {username}!</Text>
                        </View>
                        <TouchableOpacity style={{ flex: 2, marginTop: 4 }} onPress={() => { navigation.navigate('Posting') }}>
                            <Icon name={'add-circle-outline'}
                                size={30}
                                color={'blue'}>

                            </Icon>
                        </TouchableOpacity>
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
                    style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {

                        setModalVisible(!modalVisible);
                    }}>
                    <ImageBackground style={{ backgroundColor: 'rgba(0,0,0,0.4)', width: '100%', height: '100%' }}
                        blurRadius={99}>

                        <View style={{ marginTop: 60 }}>
                            <ScrollView style={{ flexDirection: 'column', backgroundColor: 'white', minheight: 400, elevation: 10, marginLeft: 8, borderRadius: 10, width: "95%", marginBottom: 50 }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', marginTop: 10, fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: 'blue' }}>SỬA BÀI VIẾT</Text>
                                <View>
                                    <Text style={{ marginLeft: 12, fontWeight: 'bold', color: 'blue', marginBottom: 5 }}>Tiêu Đề:</Text>
                                    <TextInput style={{ borderWidth: 2, padding: 5, marginBottom: 5, fontWeight: 'bold', paddingLeft: 15, color: '#f7487c', borderColor: '#465b99', borderRadius: 6, width: "90%", alignContent: 'center', alignItems: 'center', marginLeft: 12, marginBottom: 5 }}
                                        placeholder='Nhập tiêu đề' value={title} onChangeText={(text) => settitle(text)}></TextInput>
                                    <View style={{}}>

                                        <Text style={{ marginLeft: 12, fontWeight: 'bold', color: 'blue', flex: 10 }}>Ảnh:</Text>



                                        {img_base64 == null ?
                                            <View style={{ justifyContent: 'center', alignContent: 'center', flex: 8 }}>
                                                <TouchableOpacity>
                                                    <Icon style={{ marginLeft: 140 }}
                                                        name="add-circle"
                                                        onPress={pickImage}
                                                        size={30}
                                                        color={'#f7487c'}
                                                    >
                                                    </Icon>
                                                </TouchableOpacity>
                                            </View>
                                            : null}


                                        <View style={{ alignItems: 'center', alignContent: 'center', marginBottom: 10 }}>
                                            {img_base64 != null ?
                                                <Icon style={{ flex: 1, elevation: 15 }}
                                                    name='close-circle'
                                                    color={'red'}
                                                    onPress={() => { setiimg_base64(null) }}
                                                    size={25}></Icon>
                                                : null}
                                            {img_base64 && <Image source={{ uri: img_base64 }} style={{ width: 270, height: 220 }} />}

                                        </View>

                                    </View>
                                    <Text style={{ marginLeft: 12, fontWeight: 'bold', color: 'blue', marginBottom: 5 }}>Nội dung:</Text>
                                    <TextInput multiline={true} style={{ borderWidth: 2, padding: 5, marginBottom: 5, fontWeight: 'bold', paddingLeft: 15, color: '#f7487c', borderColor: '#465b99', borderRadius: 6, width: "90%", alignContent: 'center', alignItems: 'center', marginLeft: 12, marginBottom: 5 }}
                                        placeholder='Nhập nội dung' value={content} onChangeText={(text) => setcontent(text)}></TextInput>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', marginTop: 15, borderTopWidth: 0.5, borderTopColor: '#e6e6e6' }}>

                                        <Icon
                                            name='arrow-back-circle-outline'
                                            size={40}
                                            color={'red'}
                                            onPress={() => { setiimg_base64(null), setModalVisible(!modalVisible) }}
                                            style={{ marginLeft: 50 }}>

                                        </Icon>

                                        <Icon
                                            name='checkmark-circle-outline'
                                            size={40}
                                            color={'#1e55a8'}
                                            onPress={() => { UpdateArticle(), setiimg_base64(null), setModalVisible(false) }}
                                            style={{ marginLeft: 120 }}>

                                        </Icon>

                                    </View>
                                </View>
                            </ScrollView>
                        </View>

                    </ImageBackground>
                </Modal>



            </View>



        </View>
    )
}
export default Home;
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
        flex: 1
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
    }
});