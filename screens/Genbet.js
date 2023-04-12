import { Text, View, Image, ActivityIndicator, Dimensions, FlatList} from 'react-native';
import { Appbar} from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import axios from "axios"

import { useEffect, useState } from 'react';

function Genbet({navigation, route}) {
  const fs = Dimensions.get("window").fontScale;
  req = route.params.getreq
  ttt = route.params.tes
  console.log("Start")
  console.log(ttt)
  const [img1,setImg1] = useState('');
  const [img2,setImg2] = useState('');
  const [img3,setImg3] = useState('');
  const [img4,setImg4] = useState('');
  const [responseReceived, setResponseReceived] = useState(false);

  const handlesreq = async() =>  {

    if (responseReceived) {
      return;
    }
    let configg = {
      method: 'get',
      maxBodyLength: Infinity,
      url: req,
      headers: { 
        'Authorization': 'Token 04890391d41e038f86c2e5f2e112e1e89b9efdcf'
      }
    };

    setTimeout(() => {
      axios.request(configg)
      .then((response) => {
        console.log(response.data.output);
        console.log(2)
        setImg1(response.data.output[0]);
        setImg2(response.data.output[1]);
        setImg3(response.data.output[2]);
        setImg4(response.data.output[3]);
        console.log(34 + " " + response.data.output[1])
        setResponseReceived(true);
      })
      .catch((error) => {
        console.log(error)

      });
    }, 6000)
}

useEffect(() => {
  let interval = null;
  if (!responseReceived) {
    interval = setInterval(() => {
      handlesreq();
    }, 6000);
  }
  return () => clearInterval(interval);
}, [responseReceived]);


  useEffect(() => {
  }, [img1, img2, img3, img4]);

  return (
    (img1 === '' || img2 === '' || img3 === '' || img4 === '') ? 
    <View className="h-full">  
    <Appbar.Header style={{backgroundColor: '#1D1D1D'}}>
        <Appbar.BackAction color='white' onPress={() => {navigation.navigate('Create')}}>
        </Appbar.BackAction>
        <Appbar.Content color="white" title="Prompt Results">
        </Appbar.Content>
    </Appbar.Header>
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#000" style={styles.spinner} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
      </View>
      :
      <View className="h-full">  
          <Appbar.Header style={{backgroundColor: '#1D1D1D'}}>
              <Appbar.BackAction color='white' onPress={() => {navigation.navigate('Create')}}>
              </Appbar.BackAction>
              <Appbar.Content color="white" title="Prompt Results">
              </Appbar.Content>
          </Appbar.Header>
          <View className="overflow-hidden bg-stone-900 flex flex-col items-center justify-start h-full" style={{paddingLeft: 21, paddingRight: 27, paddingBottom: 34}}>
            <Text className="text-white-0 text-left " style={{fontSize: 12 / fs, marginTop: 30}}>Showing results for "{ttt}"</Text>
            <View className="flex flex-row items-start justify-center" style={{marginTop: 0}}>
              <FlatList    
                columnWrapperStyle={{justifyContent: 'space-between'}}
                data={[
                  { key: 'image1', uri: img1},
                  { key: 'image2', uri: img2},
                  { key: 'image3', uri: img3},
                  { key: 'image4', uri: img4},
                ]}
                numColumns = {2}
                renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => navigation.navigate('edit')} style={[styles.button]}>
                        <Image style={styles.image} source={{ uri: item.uri }} resizeMode='cover'/>
                      </TouchableOpacity>
                    )}/>
            </View> 
          </View>
        </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    marginTop: 10,
  },
  image: {
    height: Dimensions.get("window").width*0.4,
    width: Dimensions.get("window").width*0.4,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1D1D1D'
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold'
  },
  spinner: {
    marginTop: 20
  }
})

export default Genbet;
