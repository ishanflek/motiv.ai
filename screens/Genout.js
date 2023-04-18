import React, { useState, useRef, useEffect } from 'react';
import { Text, View, Image, Dimensions, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { ScrollView } from 'react-native-virtualized-view';

function Genout({ navigation }) {
  const fs = Dimensions.get('window').fontScale;
  const [sampleImages, setSampleImages] = useState([]);
  const [folders, setFolders] = useState([]);
  const { height } = Dimensions.get('window');
  const { width } = Dimensions.get('window');

  const getSampleImages = async () => {
    const cu = auth().currentUser;
    const uuid = cu.uid;
    const imageRefs = await storage().ref().child(`${uuid}/`).listAll();
    const urls = await Promise.all(imageRefs.items.map((ref) => ref.getDownloadURL()));
    setSampleImages(urls);
  };

  const listFolders = async () => {
    const currentUser = auth().currentUser;
    const uid = currentUser.uid;
    const listResult = await storage().ref().child(uid).list({
      delimiter: '/'
    });
    const folderNames = listResult.prefixes.map((prefix) => prefix.name);
    setFolders(folderNames);
  };

  useEffect(() => {
    getSampleImages();
    listFolders();
  }, []);

  return (
    <View className="h-full" style={{ backgroundColor: "#1c1c1cff", paddingTop:  height / 15 }}>
      <ScrollView style={{ height: '100%' }}>
        <TouchableOpacity onPress={() => navigation.navigate('pref')}>
          <Image source={require('../assets/finset.png')} style={{ marginBottom: height / 30, marginLeft: width*0.85}} />
        </TouchableOpacity>
        <View className="bg-stone-900 h-full" style={{ height: '100%' }}>
          <Text className="text-white-0 text-center" style={{color: "white" ,textAlign: "center", fontSize: 36 / fs }}>
          {folders.length > 0 ? `👋 ${folders[0]}` : null}
          </Text>
          <Text className="text-white-0 text-center" style={{ color: "white" ,textAlign: "center", marginTop: height/50, fontSize: 12 / fs }}>
            4 motivs
          </Text>
          <Text
            className="text-white-0 text-left"
            style={{ color: "white", textAlign: "left", paddingLeft: width*0.05, marginTop: height/19, marginBottom: height/40, fontSize: 14 / fs }}>
            Your Motives
          </Text>
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
      </ScrollView>
    </View>
  );
}

export default Genout;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: Dimensions.get("window").width*0.6,
    width: Dimensions.get("window").width*0.4,
  },
});
