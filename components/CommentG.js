import { useRoute } from '@react-navigation/native';
import * as React from 'react'
import { Button, TextInput, Text, View, StyleSheet, Modal, TouchableHighlight, ImageBackground, ScrollView, Alert, StatusBar, FlatList, RefreshControl, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from './API';
var dem = 0;

const CommentG = ({navigation}) => {
    const [comment, setcomment] = useState();
    const [data, setdata] = useState();
    const [isLoading, setisLoading] = useState(true);
    const [userId, setuserId] = useState()
    const [id, setid] = useState()
    const [postsId, setpostsId] = useState()
    const route = useRoute();
    const [reloading, setreloading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [img_base64, setiimg_base64] = useState(null)
    const [username, setusername] = useState()
    const [commentup, setcommentup] = useState()
    const [counter, setcounter] = useState(dem)
    const reloadData = React.useCallback(() => {
        // xử lý công việc load lại dữ liệu đổ vào danh sách
        setreloading(true); // set trạng thái bắt đầu reload
        dem++;
        getlistComment();
        setcounter(dem);
        // mô phỏng đợi reload, nếu là reload từ server thật thì không cần viết lệnh dưới
        setTimeout(() => {
            setreloading(false); // sau 2s thì đổi trạng thái không rload nữa
        }, 2000);


    });




    useEffect(() => {
        const getData = async () => {

            try {
                const value = await AsyncStorage.getItem("login")
                console.log(value);
                if (value !== null) {
                    let parsed = JSON.parse(value)
                    setuserId(parsed.id)
                    setusername(parsed.username)


                }
            } catch (e) {
                // error reading value
                console.log(e);
            } finally { setisLoading(false) }

        }
        getData();
        getlistComment();
    }, [])

    const getlistComment = () => {
        fetch(API.getlistcommentguest + route.params.id)
            .then((data_res) => {
                // chuyển dữ liệu dạng json
                return data_res.json();
            })
            .then((data_json) => {
                // ghi log kết quả json
                setdata(data_json);
                console.log(data_json);
            })
            .catch((err) => {
                // nếu xảy ra lỗi thì log lỗi
                console.log(err);
            }).finally(() => setisLoading(false));

    }


    console.log(route.params.id);


    const postAddArticle = () => {
        //1. Chuẩn bị dữ liệu:

        let objSP = {
            postsId: route.params.id,
            comment: comment,
            usersId: userId,
        }


        //2. Gọi hàm fetch
        fetch(API.addcommentguest, {
            method: 'POST', // POST: Thêm mới, PUT: Sửa, DELETE: xóa, GET: lấy thông tin
            headers: { // Định dạng dữ liệu gửi đi
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objSP) // chuyển đối tượng SP thành chuỗi JSON
        })
            .then((response) => {
                console.log(response.status);
                // nếu log là 201 thì là tạo thành công
                if (response.status == 201)
                    alert("Thêm mới thành công");


            })
            .catch((err) => {  // catch để bắt lỗi ngoại lệ
                console.log(err);
            });
        //3. Tạo nút bấm để gọi hàm thêm sản phẩm
    }
    function UpdateComment() {
        let item = {
            id: id,
            postsId: route.params.id,
            comment: commentup,
            usersId: userId,
        }
        console.warn("item", item)
        fetch(API.updatecommentadmin + item.id, {
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

    renderItem = ({ item, index }) => {
        checkIfDisabled = () => {
            if (userId == item.usersId) {
                return false;
            }
            else return true;
        }
        const XoaItemUsers = () => {
            // if(! confirm ('Có đồng ý xóa không?') )
            //     return; 

            let url_api = 'http://192.168.102.16:3000/comments/' + item.id;

            fetch(API.deletecommentguest + item.id, {
                method: 'DELETE', // POST: Thêm mới, PUT: Sửa, DELETE: xóa, GET: lấy thông tin
                headers: { // Định dạng dữ liệu gửi đi
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {


                    console.log(response.status);
                    getlistComment()
                    if (response.status == 200)
                        alert("Xóa thành công");

                })
                .catch((err) => {  // catch để bắt lỗi ngoại lệ
                    console.log(err);
                });
        }

        const submit = () => {
            Alert.alert('Xóa bình luận', 'Bạn có muốn xóa bình luận này không?', [
                {
                    text: 'Cancel',

                    style: 'cancel',
                },
                { text: 'OK', onPress: () => XoaItemUsers() },
            ]);

        }

        function SelectComment() {
            setid(item.id);
            setuserId(item.usersId);
            setpostsId(item.postsId);
            setcommentup(item.comment);
        }
        return (

            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <Image style={{
                    width: 40, height: 40, marginRight: 5, marginTop: 3,
                    alignItems: 'center', borderRadius: 60, borderWidth: 1, borderColor: "black", backgroundColor: 'white'


                }} source={{
                    uri: item.users.image,
                }} ></Image>

                <View style={{ marginBottom: 10, marginRight: 10, backgroundColor: 'white', elevation: 5, borderRadius: 8, padding: 10, width: '80%' }}>
                    <View>

                        <View style={{ flexDirection: 'row' }}>

                            <Text style={styles.input1} >{item.users.username}</Text>

                            {userId == item.usersId ? <TouchableOpacity style={{ flex: 1 }} onPress={submit} disabled={!!checkIfDisabled()}>
                                <Icon
                                    name='close-circle'
                                    size={12}
                                    color={'red'}
                                />
                            </TouchableOpacity> : null}
                            {userId == item.usersId ? <TouchableOpacity style={{ flex: 1 }} onPress={() => { SelectComment(item.id), setModalVisible(true) }}>
                                <Icon
                                    name='refresh-circle'
                                    size={14}
                                    color={'green'}
                                />
                            </TouchableOpacity> : null}

                        </View>
                        <View style={{ fontWeight: 'bold', fontSize: 15 }}>
                            <Text style={styles.input} > {item.comment}</Text>
                        </View>
                    </View>



                </View>
            </View>
        )

    }
    return (
        <View style={{ flex: 1 }} >
            <View style={{ width: '100%', height: 60, flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: '#8e8e8e', alignItems: 'center', backgroundColor: 'white' }}>
                <Icon
                    name='arrow-back'
                    size={25}
                    color={'blue'}
                    style={{ marginLeft: 6, marginTop: 2 }}
                    onPress={() => { navigation.goBack() }}>

                </Icon>
                <Text style={{ marginLeft: 15, fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'blue' }}>Comments</Text>

            </View>
            <View style={{ width: 300, height: 345, marginLeft: 15 }}>
                {isLoading ? <ActivityIndicator /> : (<FlatList
                    refreshControl={<RefreshControl refreshing={reloading}
                        onRefresh={reloadData} />
                    }
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => `key-${item.id}`}>
                </FlatList>
                )}

            </View>
            <View style={{
                width: '100%', height: 60, position: 'absolute', bottom: 0, flexDirection: 'row',
                justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff'
            }}>
                <TextInput placeholder='Nhập bình luận...' style={{ width: '80%', marginLeft: 20 }} value={comment} onChangeText={text => setcomment(text)}></TextInput>
                <Icon
                    style={{ marginRight: 10, fontWeight: '400' }} onPress={postAddArticle}
                    size={30}
                    name='send'
                    color={'#4281f5'}>

                </Icon>

            </View>

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
                                <Text style={styles.titletextinput}>Bình Luận:</Text>
                                <TextInput style={styles.textinput}
                                    placeholder='Nhập Bình Luận' value={commentup} onChangeText={(text) => setcommentup(text)}></TextInput>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'space-between' }}>



                                <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10, backgroundColor: '#4b8abd', width: 110, borderRadius: 4, marginLeft: 100, marginBottom: 10 }} onPress={() => { UpdateComment(), setModalVisible(!modalVisible) }}>
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

                </ImageBackground>
            </Modal>

        </View>

    )
}
export default CommentG;

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dropdown: {
        width: 200,
        zIndex: 1000,
        marginBottom: 10
    },
    textinput: {
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
        padding: 10
    },
    input1: {
        flex: 7,
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5
    },
    textinput: {
        borderWidth: 2, fontWeight: 'bold', padding: 5, paddingLeft: 15, color: '#f7487c', borderRadius: 6, width: "90%", borderColor: '#465b99', alignContent: 'center', alignItems: 'center', marginLeft: 12, marginBottom: 5
    },
    titletextinput: {
        marginLeft: 12, fontWeight: 'bold', color: 'blue', marginBottom: 5
    },
    modalContent: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0
    }
});