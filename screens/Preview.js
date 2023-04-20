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
  Dimensions
} from 'react-native';


function Editor({route, navigation}) {

  const [img,SetImg] = useState(route.params.imgurl)
  const { height,width } = Dimensions.get('window');

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
          <View style={{height: "88%"}}>
          </View>
        </ImageBackground>
    <View style={{height: '20%', backgroundColor: '#1D1D1D', paddingTop: 15, margin: 0}}>
        <View className="flex flex-row justify-around items-center">
        <TouchableOpacity 
          style={{width: "90%", height: height/15, backgroundColor: '#AAAAAA24', borderRadius: 8}} 
          onPress={shareImage}
        >
          <Image style={{marginLeft: "39%"}} source={require('../assets/share.png')} />
          <Text style={{color: 'white',marginBottom: 14, marginTop: 5, paddingLeft: "43%"}}>Share</Text>
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
