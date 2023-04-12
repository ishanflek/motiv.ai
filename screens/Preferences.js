import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { Appbar, Button, TextInput, Avatar, ProgressBar } from 'react-native-paper';

const fs = Dimensions.get('window').fontScale; 

function Pref({navigation}) {
  return (
      <View>
        <Appbar.Header style={{ backgroundColor: '#1D1D1D', width: '100%'}}>
          <Appbar.BackAction color='white' onPress={() => {navigation.navigate('main')}}>
          </Appbar.BackAction>
          <Appbar.Content title='Preferences' color='white'>
          </Appbar.Content>
        </Appbar.Header>
        <View className='h-full bg-stone-900' style={{}}>
          <View>
          <TouchableOpacity onPress={() => {navigation.navigate('acc')}}>
            <View className="flex flex-row items-center justify-between w-full" style={{marginTop: 10, padding: 20}}>
              <Text className="text-white text-left" style={{marginTop: 2, marginBottom: 2, fontSize: 18 / fs, color: 'white'}}>Account</Text>
              <Image source={require("../assets/Vector.png")} alt=""></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate('tos')}}>
            <View className="flex flex-row items-center justify-between w-full" style={{marginTop: 10, padding: 20}}>
              <Text className="text-white text-left" style={{marginTop: 2, marginBottom: 2, fontSize: 18 / fs, color: 'white'}}>Terms of Service</Text>
              <Image source={require("../assets/Vector.png")} alt=""></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate('about')}}>
            <View className="flex flex-row items-center justify-between w-full" style={{marginTop: 10, padding: 20}}>
              <Text className="text-white text-left" style={{marginTop: 2, marginBottom: 2, fontSize: 18 / fs, color: 'white'}}>About</Text>
              <Image source={require("../assets/Vector.png")} alt=""></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate('help')}}>
            <View className="flex flex-row items-center justify-between w-full" style={{marginTop: 10, padding: 20}}>
              <Text className="text-white text-left" style={{marginTop: 2, marginBottom: 2, fontSize: 18 / fs, color: 'white'}}>Help</Text>
              <Image source={require("../assets/Vector.png")} alt=""></Image>
            </View>
          </TouchableOpacity>
          </View> 
          <View style={{marginLeft: 150, marginTop: 360}}>
              <Text className='text-neutral-400' style={{ alignContent: 'center', fontSize: 11 / fs}}>App made with</Text>
              <Image style={{marginTop: 4, marginLeft: 6}} source={require('../assets/247_2038.png')} alt=''></Image>
          </View>
        </View>
        </View>
  );
}

const styles=StyleSheet.create({
  con1: {
    flexDirection: "row",
    width: 150,
    marginTop:20,
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'flex-row'
  },
  con2: {
    marginLeft: 20,
    marginTop: 20,
    width: 130,
    height: 40
  },
  con3: {
    marginLeft: 20,
    marginTop: 20,
    width: 130,
    height: 40
  },
  but: {
    marginLeft: 280 / fs,
    height: 10,
    width: 5
  }
})
export default Pref;









