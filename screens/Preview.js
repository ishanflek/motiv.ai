import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  ImageBackground,
  Share,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,

} from 'react-native';


function Editor({route, navigation}) {

  const [img,SetImg] = useState(route.params.imgurl)

  const shareImage = async () => {
    console.log(img)
    try 
    {
      await Share.share({
        message: route.params.imgurl,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
};

useEffect(() => {console.log(route.params.imgurl)}, [img]);



  return (
    <View style={{width: '100%', height: '100%'}}>
        <ImageBackground source={{uri: route.params.imgurl}}>
          <View style={{height: "90%"}}>
          </View>
        </ImageBackground>
    <View style={{height: '20%', backgroundColor: '#000000', paddingBottom: 0, margin: 0}}>
        <View className="flex flex-row justify-around items-center">
          <TouchableOpacity style={{marginTop: 4}}className="bg-[#141519] rounded-lg w-24 flex flex-col items-center p-2" onPress={shareImage}>
            <Image source={require('../assets/share.png')} />
            <Text style={{color: 'white'}}>Share</Text>
          </TouchableOpacity>
        </View>
  </View>  
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Editor;
