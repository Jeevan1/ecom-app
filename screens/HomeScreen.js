import React, { useLayoutEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import HeaderRight from "../components/HeaderRight";
import colors from "../constants/colors";
import SearchInput from "../components/SearchInput";
import Banner from "../components/Banner";
import { bannerData } from "../data/banner";
import Categories from "../components/Categories";
import HeaderTitle from "../components/HeaderTitle";

function HomeScreen({ navigation, route }) {
  const products = useSelector((state) => state.products.products);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: (props) => <HeaderTitle {...props} />,
      headerTitleStyle: styles.headerTitle,
    });
  }, []);

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.container}
    >
      <View style={styles.innerContainer}>
        <SearchInput products={products} style={{ marginHorizontal: 20 }} />
        <Banner data={bannerData} />
        <Categories />
      </View>
    </ScrollView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 10,
    paddingBottom: 20,
  },
  headerTitle: {
    fontWeight: "bold",
    color: colors.white,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    // width: "90%",
    // marginHorizontal: "5%",
  },
});
