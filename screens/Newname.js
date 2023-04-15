import React, {useState} from 'react';
import { View, Text,StyleSheet,Dimensions} from 'react-native';
import { Appbar, Button, TextInput, Avatar, ProgressBar } from 'react-native-paper';
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const createFolder = async (folderName) => {
  const navigation = useNavigation();
  const currentUser = auth().currentUser;
  const uid = currentUser.uid;
  const storageRef = storage().ref(`${folderName}/`);
  await storageRef.put();
  console.log('Folder created!');
  navigation.navigate('main')
};

function Newname() {

  const fs = Dimensions.get("window").fontScale;
  const [name,setName] = useState('')

  const createFolder = async (folderName) => {
    console.log("hellowar")
    const navigation = useNavigation();
    const currentUser = auth().currentUser;
    const uid = currentUser.uid;
    const storageRef = storage().ref(`${uid}/${folderName}`);
    await storageRef.put();
    console.log('Folder created!');
    navigation.navigate('main')
  };

  return (
  <View className="overflow-hidden flex flex-col justify-between w-full" style={{backgroundColor: '#1c1c1cff', paddingLeft: 22, paddingRight: 24, paddingTop: 98, paddingBottom: 540 }}>
    <Text className="" style={{color: '#d5d5d5ff', fontSize: 36 / fs}}>Nice to{'\n'}meet you</Text>
    <TextInput className="w-full" style={{marginTop: 71}} label=" Your Name please" mode="flat" value={name} onChangeText={setName}></TextInput>
    <Button title="Next" className="w-full" style={{marginTop: 23}} onPress={createFolder(name)} mode="contained" labelStyle={{"padding":5}}>Next</Button>
  </View>
  );
}

export default Newname;
