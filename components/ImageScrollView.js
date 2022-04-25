import React from "react";
import { View, Animated, Image } from "react-native";
import { SIZES, COLORS } from "../constants";

export default function ImageScrollView({ images }) {
  const scrollX = new Animated.Value(0);
  const dotPosition = Animated.divide(scrollX, SIZES.width);

  return (
    <View>
      {/* SCROLL IMAGES */}
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
      >
        {images.map((item, index) => {
          return (
            <View key={`image-${index}`} style={{ alignItems: "center" }}>
              <View style={{ height: SIZES.height * 0.5 }}>
                {/* image */}
                <Image
                  source={{ uri: item }}
                  resizeMode="cover"
                  style={{
                    width: SIZES.width,
                    height: "100%",
                  }}
                />
              </View>
            </View>
          );
        })}
      </Animated.ScrollView>

      {/* SCROLL DOTS  */}
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: SIZES.padding,
          }}
        >
          {images.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });

            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: "clamp",
            });

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                }}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}
