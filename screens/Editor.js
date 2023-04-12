import { Text, View, Image, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { Appbar, Button, TextInput, Avatar, ProgressBar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
function Editor({navigation}) {
  const fs = Dimensions.get("window").fontScale;

  return (
      <ScrollView showVerticalScrollIndicator={false}>
        <View className="overflow-hidden bg-stone-900 flex flex-col items-center justify-between w-full" style={{paddingTop: 50, paddingBottom: 18}}>
          <Text>hi</Text>
        </View>
      </ScrollView>
  );
}

export default Editor;