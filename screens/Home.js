import React, { useState, useEffect } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Appbar, Button, TextInput} from 'react-native-paper';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { ScrollView } from 'react-native-virtualized-view';

function Home({navigation}) {
  const fs = Dimensions.get("window").fontScale;  
  const { height,width } = Dimensions.get('window');

  const [sampleImages, setSampleImages] = useState([]);
{/*}
  const getSampleImages = async () => {
    try {
      const cu = auth().currentUser;
      const uuid = cu.uid;
      const imageRefs = await storage().ref().child(`${uuid}/`).listAll();
      const urls = await Promise.all(imageRefs.items.map((ref) => ref.getDownloadURL()));
      setSampleImages(urls);
    } catch (error) {
      if (error.code === 'storage/quota-exceeded') {
        Alert.alert('Storage quota exceeded. Please upgrade your firebase plan and try again.');
      } else {
        Alert.alert('An error occurred. Please try again later.');
      }
      console.log(error);
    }
  };

  useEffect(() => {
    getSampleImages();
  }, []);
*/}

  return (
    <View className="bg-stone-900" style={{backgroundColor: "#1c1c1cff"}}>
      <ScrollView style={{ height: '100%' }}>
        <View className="bg-stone-900 relative" style={{width: '100%', paddingTop: height/90}}>
          <View className="bg-stone-900 flex flex-col justify-between w-full" style={{width: '100%', marginTop: height/ 10}}>
              <View style={{flexDirection: 'row', marginLeft: width*0.2,}}>
              <Image style={{marginRight: width*0.02, marginTop: height/42}} source={require("../assets/247_1993.png")} alt=""></Image>
              <Text className="text-neutral-201 text-left" style={{ color: 'white', marginTop: height/25, marginBottom: height/52, fontSize: 33 / fs}}>Motiv.ai</Text>
              </View>
            <View className="flex flex-row items-center justify-between w-full">
              <Text className="text-white text-left" style={{padding: 15, marginTop: height/42, marginBottom: 2, fontSize: 14 / fs, color: 'white'}}>Top Picks</Text>
            </View>
            <FlatList
          style={{marginLeft: width*0.02, backgroundColor: "#1c1c1cff"}}
            data={[
              {id: '1',  image: require('../assets/238_1564.png')},
              {id: '2',  image: require('../assets/238_6418.png')},
              {id: '3',  image: require('../assets/238_6403.png')},
              {id: '4',  image: require('../assets/238_6407.png')},
              {id: '5',  image: require('../assets/238_6409.png')},
              {id: '6',  image: require('../assets/238_6412.png')},
              {id: '7',  image: require('../assets/238_6415.png')},
              {id: '8',  image: require('../assets/238_6418.png')},
            ]}
            numColumns={2}
            renderItem={({item}) => (
              <View style={{padding: width*0.02, width: "49%", height: height/3.5}}>
                <Image
                  style={{
                    width: '100%',
                    height: "100%",
                    resizeMode: 'contain',
                   }}
                   source={item.image}
                   resizeMode="cover"
                 />
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
