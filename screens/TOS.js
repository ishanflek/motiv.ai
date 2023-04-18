import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Appbar, Button, TextInput, Avatar, ProgressBar } from 'react-native-paper';

function ToS({navigation}) {
  const fs = Dimensions.get("window").fontScale;
  const { width } = Dimensions.get('window');

  return (
      <View className="bg-stone-900">
         <Appbar.Header style={{ backgroundColor: '#1D1D1D', width: '100%'}}>
          <TouchableOpacity onPress={() => {navigation.navigate('pref')}}>
            <Image style={{marginLeft: width*0.01}} source={require("../assets/Frame.png")} alt=""></Image>
          </TouchableOpacity>
          <Appbar.Content className="items-center" title='Terms of Service' color='white' />
        </Appbar.Header>
          <View className="flex flex-col items-start justify-between w-full" style={{paddingLeft: 24, paddingRight: 23, paddingTop: 36, paddingBottom: 257}}>
            <Text className="text-white-0 text-left" style={{fontSize: 22 / fs}}>Clause 1</Text>
            <Text className="shrink text-white-0 text-left" style={{marginTop: 9, fontSize: 12 / fs}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.</Text>
            <Text className="text-white-0 text-left" style={{marginTop: 30, fontSize: 22 / fs}}>2. Clause 2</Text>
            <Text className="shrink text-white-0 text-left" style={{marginTop: 9, fontSize: 12 / fs}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.{'\n'}
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.</Text>
            <Text className="text-white-0 text-left" style={{marginTop: 30, fontSize: 22 / fs}}>3. Clause 3</Text>
            <Text className="shrink text-white-0 text-left" style={{marginTop: 9, fontSize: 12 / fs}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.{'\n'}
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.</Text>
          </View>
      </View>
  );
}

export default ToS;