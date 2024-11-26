import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  Text,
  View,
  StyleSheet,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

const Banner = ({ data }) => {
  const width = Dimensions.get("window").width;
  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width}
        height={"100%"}
        autoPlay={true}
        autoPlayInterval={3000}
        data={data}
        scrollAnimationTimingFunction="linear"
        scrollAnimationDuration={1000}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.itemContainer}>
            <Pressable
              onPress={() => console.log(`Pressed item ${index}`)}
              style={styles.imageContainer}
            >
              <Image source={item.img} style={styles.image} />
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    height: 230,
  },
  itemContainer: {
    width: "100%",
    borderRadius: 20,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
});

export default Banner;
