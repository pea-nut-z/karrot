import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Image,
  SafeAreaView,
} from 'react-native';
import {Header} from '../../components';

export default function Report({navigation}) {
  return (
    <View style={{flex: 1}}>
      <Header
        title={'Report seller'}
        useBackBtn={true}
        navigation={navigation}
      />
    </View>
  );
}
