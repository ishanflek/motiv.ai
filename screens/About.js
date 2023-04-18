import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Appbar,} from 'react-native-paper';

function About({navigation}) {
    const fs = Dimensions.get("window").fontScale;
    const { width } = Dimensions.get('window');

      return (
          <View className="bg-stone-900 h-full">
        <Appbar.Header style={{ backgroundColor: '#1D1D1D', width: '100%'}}>
          <TouchableOpacity onPress={() => {navigation.navigate('pref')}}>
            <Image style={{marginLeft: width*0.01}} source={require("../assets/Frame.png")} alt=""></Image>
          </TouchableOpacity>
          <Appbar.Content className="items-center" title='About' color='white' />
        </Appbar.Header>
            <View className="flex flex-col items-center justify-between" style={{marginTop: 140, paddingBottom: 340}}>
              <Image className="" source={require("../assets/238_1746.png")} alt=""></Image>
              <Text className="text-white-1 text-left" style={{marginTop: 27, fontSize: 57 / fs}}>motiv.ai</Text>
            </View>
          </View>
      );
    }

export default About;