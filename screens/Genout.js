import React, { useState, useRef, useEffect } from 'react';
import { Text, View, Image, Dimensions, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { ScrollView } from 'react-native-virtualized-view';

function Genout({ navigation }) {
  const fs = Dimensions.get('window').fontScale;
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
    <View className="bg-stone-900 h-full" style={{ paddingTop: 80 }}>
      <ScrollView style={{ height: '100%' }}>
        <TouchableOpacity onPress={() => navigation.navigate('pref')}>
          <Image source={require('../assets/finset.png')} style={{ marginBottom: 40, marginLeft: 330 }} />
        </TouchableOpacity>
        <View className="bg-stone-900 h-full" style={{ height: '100%' }}>
          <Text className="text-white-0 text-center" style={{ fontSize: 36 / fs }}>
            👋 Nikhil
          </Text>
          <Text className="text-white-0 text-center" style={{ marginTop: 8, fontSize: 12 / fs }}>
            4 motivs
          </Text>
          <Text
            className="text-white-0 text-left"
            style={{ paddingLeft: 40, marginTop: 48, marginBottom: 35, fontSize: 14 / fs }}>
            Your Motives
          </Text>
          <FlatList
            columnWrapperStyle={{justifyContent: 'space-between'}}
            data={sampleImages}
            numColumns={2}
            renderItem={({item}) => (
              <View style={{padding: 8, width: "48%", height: 280}}>
                <Image
                  style={{
                    width: '100%',
                    height: "100%",
                    resizeMode: 'contain',
                   }}
                  source={{uri: item}}
                  resizeMode="cover"
                />
                </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default Genout;
