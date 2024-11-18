import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { getStarIcons } from "../helpers";
import { Ionicons } from "@expo/vector-icons";

export function ReviewCard({ review, item }) {
  const starIcons = getStarIcons(review.rating, 5);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.comment}>
          {review.comment}
        </Text>
        <View style={styles.review}>
          <View style={styles.starContainer}>
            {starIcons.map((iconName, index) => (
              <Ionicons
                key={index}
                name={iconName}
                size={14}
                color={colors.primary}
                style={styles.star}
              />
            ))}
          </View>
          <Text numberOfLines={1} style={styles.reviewerName}>
            {review.reviewerName}
          </Text>
        </View>
      </View>
      <FlatList
        data={item.images.slice(0, 2)}
        numColumns={2}
        columnWrapperStyle={{ gap: 5 }}
        contentContainerStyle={{ gap: 5 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              height: 70,
              width: 70,
              gap: 10,

              borderWidth: 1,
            }}
          >
            <Image source={{ uri: item }} style={styles.image} />
          </View>
        )}
        style={styles.imageContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 15,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: "row",
    gap: 10,
  },
  content: {
    flexBasis: "53%",
  },
  imageContainer: {
    flexBasis: "46%",
    // height: 100,
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  comment: {
    color: colors.dark,
    fontWeight: "bold",
    marginBottom: 5,
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "fit-content",
  },
  star: {},
  review: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  reviewerName: {
    flex: 1,
    fontWeight: "bold",
    color: colors.medium,
  },
});
