import { NavigationContainer } from '@react-navigation/native';
import { FlatList, Text, View, Image, ScrollView, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { Appbar, Button, TextInput, Avatar, ProgressBar } from 'react-native-paper';
import React, { useState, useEffect} from 'react';
import axios from "axios"

function Genin({navigation}) {
  const fs = Dimensions.get("window").fontScale;
  const [selectedButton, setSelectedButton] = useState('');

  const [style, setStyle] = useState('');
  const[text,setText] = useState('');


  const handlefreq = async() =>  {
    console.log(style)
    let pr = text + " in " +style;
    console.log(pr)
    let data = JSON.stringify({
      "version": "db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
      "input": {
        "prompt": pr,
        "num_outputs": 4
      }
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.replicate.com/v1/predictions',
      headers: { 
        'Authorization': 'Token 04890391d41e038f86c2e5f2e112e1e89b9efdcf', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    const response = await axios.request(config)
    console.log(response.data.urls.get)
    console.log(pr)
    navigation.navigate('genbet', {getreq: response.data.urls.get,
                                  tes: pr});
  }

  const handleButtonPress = (id) => {
    setSelectedButton(id);
    setStyle('cartoon style')
  }

  useEffect(() => {
  }, [style]);

  return (
    <View className=" flex bg-stone-900 justify-center w-full" style={{paddingTop: 50,}}>
    <Appbar.Header style={{backgroundColor: '#1D1D1D'}}>
    <Appbar.BackAction color='white' onPress={() => {navigation.navigate('home')}}>
    </Appbar.BackAction>
    <Appbar.Content color="white" title="Create">
    </Appbar.Content>
  </Appbar.Header>
        <View className="overflow-hidden bg-stone-900 flex flex-col items-start justify-between w-full" style={{paddingLeft: 24, paddingRight: 22, paddingBottom:42}}>
          <Text className="shrink text-white-0 text-left" style={{fontSize: 12 / fs}}>Generate original, realistic images and art from a text description</Text>
          <TextInput className="w-full" style={{marginTop: 22}} label="Input" mode="flat" value={text} onChangeText={setText}></TextInput>
          <Text className="text-white-0 text-left" style={{marginTop: 16, fontSize: 14 / fs}}>Styles</Text>
          <View className="flex flex-row items-start justify-center w-full" style={{marginTop: 20}}>
            <FlatList    
              columnWrapperStyle={{justifyContent: 'space-between'}}
              data={[
                { id: '1', image: require('../assets/cartoon.jpeg') },
                { id: '2', image: require('../assets/anime.jpg') },
                { id: '3', image: require('../assets/cartoon.jpeg') },
                { id: '4', image: require('../assets/space.jpg') },
                { id: '5', image: require('../assets/cartoon.jpeg') },
                { id: '6', image: require('../assets/space.jpg') },
                { id: '7', image: require('../assets/cartoon.jpeg') },
                { id: '8', image: require('../assets/cartoon.jpeg') },
                { id: '9', image: require('../assets/anime.jpg') }, 
               ]}
              numColumns = {3}
              renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleButtonPress(item.id)} 
                    style={[styles.button, selectedButton === item.id && styles.selectedButton]}>
                      <Image style={styles.image} source={item.image} resizeMode='cover'/>
                    </TouchableOpacity>
                  )}/>
          </View>
          <Button className="w-full" style={{marginLeft: 1, marginTop: 19}} onPress={handlefreq} mode="contained" labelStyle={{"padding":5}}>Create</Button>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    aspectRatio: 1,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 5,
    margin: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    borderColor: '#ff6347',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default Genin;