import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image,ScrollView} from 'react-native';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';

import { useEffect, useState } from 'react';
import Posting from './components/Posting';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Setting from './components/Setting';
import Comment from './components/Comment';
import HomeG from './components/HomeG';
import { Audio } from 'expo-av';
import AudioSlider from './src/AudioSlider';
import AudioFile from './assets/Hello.mp3';
import CommentG from './components/CommentG';
import HomeGuest from './components/HomeGuest';
import Management from './components/Management';
import AudioFile1 from './assets/Levitating.mp3';
import HomeT from './components/HomeT';
import SettingGuest from './components/SettingGuest';
import SettingT from './components/SettingT';
import CommentT from './components/CommentT';

const Tab = createBottomTabNavigator();
const StackASM = createNativeStackNavigator();
const audioBookPlaylist = [{
  title: 'Hamlet - Act I',
  author: 'William Shakespeare',
  source: 'Librivox',
  uri:
    'https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act1_shakespeare.mp3',
  imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
},
{
  title: 'Hamlet - Act II',
  author: 'William Shakespeare',
  source: 'Librivox',
  uri:
    'https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act2_shakespeare.mp3',
  imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
},
{
  title: 'Hamlet - Act III',
  author: 'William Shakespeare',
  source: 'Librivox',
  uri: 'http://www.archive.org/download/hamlet_0911_librivox/hamlet_act3_shakespeare.mp3',
  imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
},
{
  title: 'Hamlet - Act IV',
  author: 'William Shakespeare',
  source: 'Librivox',
  uri:
    'https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act4_shakespeare.mp3',
  imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
},
{
  title: 'Hamlet - Act V',
  author: 'William Shakespeare',
  source: 'Librivox',
  uri:
    'https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act5_shakespeare.mp3',
  imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
}
]

const Music = () => {
  return (
    <View style={{ flex: 1 }} >
    <View style={{ width: '100%', height: 60, flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: '#8e8e8e', alignItems: 'center',backgroundColor:'white' }}>
  
        <Text style={{ marginLeft: 15, fontSize: 20, fontWeight: 'bold',textAlign:'center',color:'blue' }}>Music</Text>

    </View>
    
    <ScrollView style={ {
      flex: 0,
      flexDirection: "column",
      marginTop: 20,
      marginBottom: 5,
    }}>



      <View style={{ width: '95%', minheight: 200, backgroundColor: 'white', marginLeft: 5, elevation: 5, borderRadius: 8, padding: 4,marginBottom:10 }}>
        <View style={{

        }}>

          <Image
            style={{ width: 140, height: 120, marginLeft: 80, marginTop: 5, marginBottom: 5 }}
            resizeMode="stretch"
            source={require('./assets/adele.jpg')}
          />

          <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>
            Hello - Adele
          </Text>



        </View>

        <AudioSlider audio={AudioFile} />
      </View>
      <View style={{ width: '95%', minheight: 200, backgroundColor: 'white', marginLeft: 5, elevation: 5, borderRadius: 8, padding: 4,marginBottom:10 }}>
        <View style={{

        }}>

          <Image
            style={{ width: 140, height: 120, marginLeft: 80, marginTop: 5, marginBottom: 5 }}
            resizeMode="stretch"
            source={require('./assets/img1.jpg')}
          />

          <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>
            Levitating - Dua Lipa
          </Text>



        </View>

        <AudioSlider audio={AudioFile1} />
      </View>


    </ScrollView>
    </View>
  );


}

export function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name='HomeTab' component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }} />
      <Tab.Screen name='Music' component={Music}
        options={{
          tabBarLabel: 'Music',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="musical-notes" color={color} size={size} />
          ),
        }} />
      <Tab.Screen name='Settings' component={Setting}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }} />


    </Tab.Navigator>
  )
}
export function TabNavigator1() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name='HomeTabG' component={HomeGuest}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name='MusicGuest' component={Music}
        options={{
          tabBarLabel: 'Music',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="musical-notes" color={color} size={size} />
          ),
        }} />
      <Tab.Screen name='SettingGuest' component={SettingGuest}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }} />


    </Tab.Navigator>
  )
}
export function TabNavigator2() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name='HomeTabT' component={HomeT}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name='MusicGuest' component={Music}
        options={{
          tabBarLabel: 'Music',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="musical-notes" color={color} size={size} />
          ),
        }} />
      <Tab.Screen name='SettingT' component={SettingT}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }} />


    </Tab.Navigator>
  )
}

const App = () => {

  return (
    <NavigationContainer>
      <StackASM.Navigator initialRouteName='Login' screenOptions={{
        headerShown: false
      }}>
        <StackASM.Screen name='Home' component={TabNavigator} options={{ title: 'Trang Chủ' }} />
        <StackASM.Screen name='HomeT' component={TabNavigator2} options={{ title: 'Trang Chủ' }} />
        <StackASM.Screen name='Posting' component={Posting} options={{ title: 'Posting' }} />
        <StackASM.Screen name='Login' component={Login} options={{ title: 'Đăng Nhập', tabBarVisible: false }} />
        <StackASM.Screen name='Register' component={Register} options={{ title: 'Đăng ký' }} />
        <StackASM.Screen name='Comment' component={Comment} options={{ title: 'Bình Luận' }} />
        <StackASM.Screen name='CommentG' component={CommentG} options={{ title: 'Bình Luận' }} />
        <StackASM.Screen name='CommentT' component={CommentT} options={{ title: 'Bình Luận' }} />
        <StackASM.Screen name='HomeGuest' component={TabNavigator1} options={{ title: 'Trang Chủ' }} />
        <StackASM.Screen name='Management' component={Management} options={{ title: 'Người Dùng' }} />
      </StackASM.Navigator>

    </NavigationContainer>
  );
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  albumCover: {
    width: 250,
    height: 250
  },
  controls: {
    flexDirection: 'row'
  },
  control: {
    margin: 20
  }
});
