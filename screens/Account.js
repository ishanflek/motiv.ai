import React, { useState, useRef, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Appbar, Button, TextInput, Avatar, ProgressBar } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

function Acc({navigation}) {
  const fs = Dimensions.get("window").fontScale;
  const [folders, setFolders] = useState([]);
  const [number, setNumber] = useState('')

  async function signOutUser() {
    try {
      await auth().signOut();
      navigation.navigate('first');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  const listFolders = async () => {
    const currentUser = auth().currentUser;
    const phoneNumber = currentUser.phoneNumber;
    setNumber(phoneNumber)
    console.log(phoneNumber)
    const uid = currentUser.uid;
    const listResult = await storage().ref().child(uid).list({
      delimiter: '/'
    });
    const folderNames = listResult.prefixes.map((prefix) => prefix.name);
    setFolders(folderNames);
    console.log(folderNames)
  };

  useEffect(() => {
    listFolders();
  }, []);

  return (
      <View className="bg-stone-900">
        <Appbar.Header style={{ backgroundColor: '#1D1D1D', width: '100%'}}>
          <Appbar.BackAction color='white' onPress={() => {navigation.navigate('pref');}} />
          <Appbar.Content title='Account' color='white' />
        </Appbar.Header>
          <View className="flex flex-col items-start justify-between w-full" style={{paddingLeft: 28, paddingRight: 20, paddingTop: 37, paddingBottom: 542, borderRadius: 14}}>
          <View className="items-center w-full">
            <Text style={{backgroundColor: "lightgrey", color: "black", fontSize: 22 / fs, textAlign: 'center', padding: 14}} className="w-full">
            {folders.length > 0 ? `${folders[0]}` : null}
            </Text>
          </View>
          <View className="items-center w-full flex flex-row">
            <Text style={{backgroundColor: "lightgrey", color: "black", fontSize: 20 / fs, marginTop: 20, textAlign: 'center', padding: 14}} className="w-full">
            {`${number}`}
            </Text>
          </View>
            <TouchableOpacity onPress={signOutUser}>
            <View className="flex flex-row items-center justify-center w-full gap-4" style={{marginTop: 10}}>
              <Text className="text-white text-left" style={{marginTop: 2, marginBottom: 2, fontSize: 18 / fs, color: 'white'}}>Logout</Text>
              <Image source={require("../assets/logout.png")} alt="" />
            </View>
              </TouchableOpacity>
          </View>
      </View>
  );
}

export default Acc;
