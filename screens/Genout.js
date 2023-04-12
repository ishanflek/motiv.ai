import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Image, ScrollView, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Appbar, Button, TextInput, Avatar, ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

function Genout({navigation}) {
  const fs = Dimensions.get("window").fontScale;

  return (
    <View className="bg-stone-900 h-full" style={{paddingTop: 80}}>
    <ScrollView style={{height: '100%'}}>
      <TouchableOpacity onPress={() => {navigation.navigate('pref')}}>
        <Image source={require("../assets/finset.png")} style={{marginBottom: 40, marginLeft: 330}} />
        </TouchableOpacity>
        <View className="bg-stone-900 h-full" style={{height: '100%'}}>
          <Text className="text-white-0 text-center" style={{fontSize: 36 / fs}}>👋 Nikhil</Text>
          <Text className="text-white-0 text-center" style={{marginTop: 8, fontSize: 12 / fs}}>4 motivs</Text>
          <Text className="text-white-0 text-left" style={{paddingLeft: 40, marginTop: 48, marginBottom: 35, fontSize: 14 / fs}}>Your Motives</Text>
          <Image style={{alignSelf: 'center'}} source={require("../assets/238_1643.png")} alt=""></Image>
        </View>
      </ScrollView>
      </View>
  );
}

export default Genout;