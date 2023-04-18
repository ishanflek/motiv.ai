import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Appbar, Button, TextInput, Avatar, ProgressBar } from 'react-native-paper';

function Help({navigation}) {
  const fs = Dimensions.get("window").fontScale;
  const { width } = Dimensions.get('window');

  return (
      <View className="bg-stone-900 overflow-hidden flex flex-col h-full">
         <Appbar.Header style={{ backgroundColor: '#1D1D1D', width: '100%'}}>
          <TouchableOpacity onPress={() => {navigation.navigate('pref')}}>
            <Image style={{marginLeft: width*0.01}} source={require("../assets/Frame.png")} alt=""></Image>
          </TouchableOpacity>
          <Appbar.Content className="items-center" title='Help' color='white' />
        </Appbar.Header>
        </View>
  );
}

export default Help;