import React, { useState, useEffect } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { Appbar, Button, TextInput} from 'react-native-paper';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { ScrollView } from 'react-native-virtualized-view';

function Home({navigation}) {
  const fs = Dimensions.get("window").fontScale;  
  const { height,width } = Dimensions.get('window');

  const [sampleImages, setSampleImages] = useState([]);

  const getSampleImages = async () => {
    const cu = auth().currentUser;
    const uuid = cu.uid;
    const imageRefs = await storage().ref().child(`${uuid}/`).listAll();
    const urls = await Promise.all(imageRefs.items.map((ref) => ref.getDownloadURL()));
    setSampleImages(urls);
  };

  useEffect(() => {
    getSampleImages();
  }, []);

  return (
    <View className="bg-stone-900">
      <ScrollView showVerticalScrollIndicator={false}>
        <View className="bg-stone-900 relative" style={{width: '100%', paddingTop: 50}}>
          <View className="flex flex-col items-start justify-between w-full" style={{width: '100%', marginTop: 70}}>
              <View style={{flexDirection: 'row'}}>
              <Image style={{marginRight: 15, marginTop: 20}} source={require("../assets/247_1993.png")} alt=""></Image>
              <Text className="text-neutral-201 text-left" style={{ color: 'white', marginTop: 30, marginBottom: 13, fontSize: 33 / fs}}>Motiv.ai</Text>
              </View>
            <View className="flex flex-row items-center justify-between w-full">
              <Text className="text-white text-left" style={{padding: 15, marginRight: 220, marginTop: 40, marginBottom: 2, fontSize: 14 / fs, color: 'white'}}>Recents</Text>
              <Image style={{marginTop: 30}}source={require("../assets/238_6397.png")} alt=""></Image>
            </View>
            <FlatList
          style={{marginLeft: width*0.02}}
            data={sampleImages}
            numColumns={2}
            renderItem={({item}) => (
              <View style={{padding: width*0.02, width: "49%", height: height/3.5}}>
                <TouchableOpacity onPress={() => navigation.navigate('prew', {imgurl: item})}>
                <Image
                  style={{
                    width: '100%',
                    height: "100%",
                    resizeMode: 'contain',
                   }}
                  source={{uri: item}}
                  resizeMode="cover"
                />
                </TouchableOpacity>
              </View>
            )}
          />
          </View>
        </View>        
      </ScrollView>
      </View>      
  );
}

export default Home;

{ /*<View className="absolute flex flex-col items-center justify-between w-full" style={{width: '100%', top: 487, paddingLeft: 21, paddingRight: 24, paddingTop: 78}}>
<View className="flex flex-row items-center justify-between w-full">
  <Text className="text-white text-left" style={{marginRight: 220, marginTop: 2, marginBottom: 2, fontSize: 14 / fs, color: 'white'}}>Top Picks</Text>
  <Image source={require("../assets/238_6397.png")} alt=""></Image>
</View>
<View className="flex flex-row flex-wrap items-start justify-between w-full" style={{marginTop: 24}}>
  <Image style={{marginRight: 12, marginBottom: 30,}} source={require("../assets/238_6403.png")} alt=""></Image>
  <Image style={{marginRight: 12, marginBottom: 30}} source={require("../assets/238_6419.png")} alt=""></Image>
  <Image style={{marginRight: 12, marginBottom: 30}} source={require("../assets/238_6415.png")} alt=""></Image>
  <Image style={{marginRight: 12, marginBottom: 30}} source={require("../assets/238_6416.png")} alt=""></Image>
  <Image style={{marginRight: 12}} source={require("../assets/238_6421.png")} alt=""></Image>
  <Image style={{marginRight: 12}} source={require("../assets/238_6418.png")} alt=""></Image>
</View>
</View> */}
