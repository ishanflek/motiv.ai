import React, {useState} from 'react';
import { View, Text,StyleSheet,Dimensions} from 'react-native';
import { Appbar, Button, TextInput, Avatar, ProgressBar } from 'react-native-paper';

function Newname({navigation}) {
    const fs = Dimensions.get("window").fontScale;
    const [phn,Setphn] = useState('')
  return (
  <View className="overflow-hidden flex flex-col justify-between w-full" style={{backgroundColor: '#1c1c1cff', paddingLeft: 22, paddingRight: 24, paddingTop: 98, paddingBottom: 540 }}>
  <Text className="" style={{color: '#d5d5d5ff', fontSize: 36 / fs}}>Nice to{'\n'}meet you</Text>
  <TextInput className="w-full" style={{marginTop: 71}} label=" Your Name please" mode="flat"></TextInput>
  <Button title="Next"className="w-full" style={{marginTop: 23}} onPress={() => {navigation.navigate('main')}} mode="contained" labelStyle={{"padding":5}}>Next</Button>
</View>
  );
}

export default Newname;
