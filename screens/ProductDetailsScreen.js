import React, { useEffect, useLayoutEffect, useRef } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import HeaderTitle from "../components/HeaderTitle";
import colors from "../constants/colors";
import HeaderRight from "../components/HeaderRight";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../components/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { addFavourite, removeFavourite } from "../store/productsSlice";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { addCartItem } from "../store/cartSlice";
import Products from "../components/Products";
import Toast, { BaseToast } from "react-native-toast-message";
import { getStarIcons } from "../helpers";
import { ReviewCard } from "../components/ReviewCard";

const ProductDetailsScreen = ({ route, navigation }) => {
  const product = route.params.item;
  const productsSlice = useSelector((state) => state.products);
  const [image, setImage] = React.useState(product.thumbnail);
  const dispatch = useDispatch();

  const scrollViewRef = useRef(null);
  let products = productsSlice.products;

  const starIcons = getStarIcons(product.rating, 5);

  let similarProducts = products
    .filter((p) => p.category === product.category)
    .filter((p) => p.id !== product.id);

  const favouritesItem = productsSlice.favourites.includes(product.id);

  const headerButtonPressHandler = () => {
    if (productsSlice.favourites.includes(product.id)) {
      dispatch(removeFavourite(product.id));
    } else {
      dispatch(addFavourite(product.id));
    }
  };

  const handleScrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleAddToCart = () => {
    dispatch(addCartItem({ id: product.id, quantity: 1, navigation }));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerRight: () => (
        <View style={styles.header}>
          <IconButton
            icon={favouritesItem ? "heart" : "heart-outline"}
            color={favouritesItem ? colors.primary : colors.dark}
            onPress={headerButtonPressHandler}
          />
          <HeaderRight />
        </View>
      ),
      title: product.title,
      headerTitleStyle: {
        color: colors.dark,
        fontSize: 18,
      },
    });
  }, [navigation, favouritesItem]);

  useEffect(() => {
    setImage(product.thumbnail);
  }, [product]);

  return (
    <>
      <ScrollView
        style={styles.main}
        contentContainerStyle={{ alignItems: "center" }}
        ref={scrollViewRef}
      >
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
          <FlatList
            data={product.images}
            numColumns={3}
            renderItem={({ item, index }) => (
              <Pressable style={styles.navImage} onPress={() => setImage(item)}>
                <Image
                  key={index}
                  source={{ uri: item }}
                  onPress={() => setImage(item)}
                  style={styles.image}
                />
              </Pressable>
            )}
            columnWrapperStyle={{ gap: 10 }}
            style={{ marginVertical: 10 }}
            keyExtractor={(item, index) => index}
          />
          <View style={styles.contentContainer}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.productTitle}>{product.title}</Text>
                <Text style={{ flex: 1 }}>({product.stock} left)</Text>
              </View>
              <Text style={{ color: colors.primary, fontWeight: "bold" }}>
                On Sale
              </Text>
            </View>
            <View style={styles.starContainer}>
              {starIcons.map((iconName, index) => (
                <Ionicons
                  key={index}
                  name={iconName}
                  size={16}
                  color={colors.primary}
                  style={styles.star}
                />
              ))}
            </View>
            <Text style={styles.description}>{product.description}</Text>
            <View style={styles.reviewWrapper}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderTopColor: colors.grey,
                  borderBottomColor: colors.grey,
                  borderTopWidth: 2,
                  borderBottomWidth: 2,
                  paddingVertical: 7,
                }}
              >
                <View style={styles.reviewContainer}>
                  <Text>Review & Ratings</Text>
                  <Text>({product.reviews.length})</Text>
                </View>
                <View style={styles.reviewContainer}>
                  <Text style={{ fontWeight: "bold" }}>{product.rating}</Text>
                  {starIcons.map((iconName, index) => (
                    <Ionicons
                      key={index}
                      name={iconName}
                      size={16}
                      color={colors.primary}
                      style={styles.star}
                    />
                  ))}
                  <Ionicons
                    name="arrow-forward"
                    size={14}
                    color={colors.primary}
                  />
                </View>
              </View>
              <View style={styles.reviewList}>
                <FlatList
                  data={product.reviews}
                  renderItem={({ item }) => (
                    <ReviewCard review={item} item={product} />
                  )}
                  keyExtractor={(item, index) => index}
                />
              </View>
            </View>
            <Products
              products={similarProducts}
              handleScrollToTop={handleScrollToTop}
            />
          </View>
        </View>
      </ScrollView>
      <Footer
        price={product.price}
        title={product.title}
        buttonText="Add to cart"
        onPress={handleAddToCart}
      />
    </>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    width: "100%",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    fontWeight: "bold",
  },
  imageContainer: {
    width: "100%",
    backgroundColor: colors.grey,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  navImage: {
    width: 100,
    height: 100,
    backgroundColor: colors.grey,
    padding: 10,
    marginBottom: 10,
  },
  contentContainer: {
    width: "90%",
    marginTop: 20,
    position: "relative",
    backgroundColor: colors.white,
    borderRadius: 20,
    // top: -50,
    minHeight: 200,
    // padding: 30,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  starContainer: {
    flexDirection: "row",
    gap: 2,
  },
  star: {
    marginHorizontal: 1,
  },
  button: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
    borderRadius: 20,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  description: {
    marginTop: 10,
    color: colors.medium,
    fontWeight: "500",
  },
  ratingButton: {
    borderRadius: 20,
    marginTop: 10,
    width: 80,
    height: 40,
    backgroundColor: colors.white,
  },
  reviewWrapper: {
    marginVertical: 10,
  },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  reviewList: {
    marginTop: 15,
  },
});
