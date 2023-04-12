import { Text, View, Image, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { Appbar, Button, TextInput, Avatar, ProgressBar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
function Editor({navigation}) {
  const fs = Dimensions.get("window").fontScale;

  return (
      <ScrollView showVerticalScrollIndicator={false}>
        <View className="overflow-hidden bg-stone-900 flex flex-col items-center justify-between w-full" style={{paddingTop: 50, paddingBottom: 18}}>
          <View className="overflow-hidden bg-white-1 flex flex-col items-center justify-between w-full" style={{paddingLeft: 16, paddingRight: 16, paddingTop: 18, paddingBottom: 437}}>
          <Button title="back" onPress={navigation.goBack()}>back</Button>
            <View className="flex flex-row items-start justify-between w-full">
              <Image style={{marginRight: 280}} source={require("../assets/238_1601.png")} alt=""></Image>
              <Image source={require("../assets/238_1605.png")} alt=""></Image>
            </View>
            <ImageBackground style={{width: "100%", height: "100%"}} source={require("../assets/241_1772.png")}>
            <Text className="text-black font-semibold text-center" style={{marginTop: 29, fontSize: 16 / fs}}>You're braver than you believe, stronger than you seem, and smarter than you think.</Text>
            </ImageBackground>
          </View>
          <View className="flex flex-row items-start justify-between" style={{marginTop: 1}}>
            <View className="bg-neutral-900 shrink flex flex-col items-center justify-between" style={{borderRadius: 6, marginRight: 16, paddingTop: 12, paddingBottom: 16}}>
              <Image source={require("../assets/238_1574.png")} alt=""></Image>
              <Text className="text-stone-300 font-light text-center" style={{marginTop: 4, fontSize: 12 / fs}}>Image</Text>
            </View>
            <View className="bg-neutral-900 shrink flex flex-col items-center justify-between" style={{borderRadius: 6, marginRight: 16, paddingTop: 12, paddingBottom: 16}}>
              <Image source={require("../assets/238_1582.png")} alt=""></Image>
              <Text className="text-stone-300 font-light text-center" style={{marginTop: 4, fontSize: 12 / fs}}>Quote</Text>
            </View>
            <View className="bg-neutral-900 shrink flex flex-col items-center justify-between" style={{borderRadius: 6, paddingTop: 12, paddingBottom: 16}}>
              <Image source={require("../assets/238_1590.png")} alt=""></Image>
              <Text className="text-stone-300 font-light text-center" style={{marginTop: 4, fontSize: 12 / fs}}>Share</Text>
            </View>
          </View>
        </View>
      </ScrollView>
  );
}

export default Editor;