import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import Colors from "../../constants/Colors.ts";
import { TouchableOpacity } from "react-native";

export default function Category({category}) {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Dogs");

  useEffect(() => {
    getCategories();
  }, []);

  // get category list from db
  const getCategories = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, "Category"));
    snapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };
  return (
    <View style={{ marginTop: 20 }}>
      <Text
        style={{
          fontFamily: "Sofadi",
          fontSize: 24,
          fontWeight: 700,
        }}
      >
        Category
      </Text>
      <FlatList
        horizontal={true}
        data={categoryList}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory(item.name);
              category(item.name);
            }}
            style={{
              flex: 1,
            }}
          >
            <View
              style={[
                styles.container,
                selectedCategory == item.name && styles.selectedCategoryCont,
              ]}
            >
              <Image
                source={{ uri: item?.imgUrl }}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <Text
              style={{
                fontFamily: "Sofadi",
                textAlign: "center",
              }}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.LIGHT_PINK,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: "50%",
    borderColor: Colors.PINK,
    margin: 5,
  },
  selectedCategoryCont: {
    backgroundColor: Colors.PINK,
    borderColor: Colors.LIGHT_PINK,
  },
});
