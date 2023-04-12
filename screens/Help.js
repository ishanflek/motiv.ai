import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Image, ScrollView, Dimensions } from 'react-native';
import { Appbar, Button, TextInput, Avatar, ProgressBar } from 'react-native-paper';

function Help({navigation}) {
  const fs = Dimensions.get("window").fontScale;

  return (
      <View className="bg-stone-900 overflow-hidden flex flex-col h-full">
        <Appbar.Header style={{ backgroundColor: '#1D1D1D', width: '100%'}}>
          <Appbar.BackAction color='white' onPress={() => {navigation.navigate('pref')}}>
          </Appbar.BackAction>
          <Appbar.Content title='Help' color='white'>
          </Appbar.Content>
        </Appbar.Header>
        </View>
  );
}

export default Help;