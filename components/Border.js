import React from 'react';
import {View} from 'react-native';
import {SIZES, COLORS} from '../constants';

export default function Border() {
  return (
    <View style={{alignItems: 'center', paddingHorizontal: SIZES.padding * 2}}>
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: COLORS.secondary,
        }}
      />
    </View>
  );
}
