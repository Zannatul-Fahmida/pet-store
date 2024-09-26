import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Category from "./Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { FlatList } from "react-native";
import PetListItem from "./PetListItem";

export default function PetListByCategory() {
  const [petList, setPetList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getPetList("Dogs");
  }, []);
  //   get pet list on category selection
  const getPetList = async (category) => {
    setLoader(true);
    setPetList([]);
    const q = query(
      collection(db, "Pets"),
      where("category", "==", category ? category : "Dogs")
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setPetList((petList) => [...petList, doc.data()]);
    });
    setLoader(false);
  };

  return (
    <View>
      <Category category={(value) => getPetList(value)} />
      <FlatList
        data={petList}
        style={{ marginTop: 10 }}
        horizontal={true}
        refreshing={loader}
        onRefresh={() => getPetList("Dogs")}
        renderItem={({ item, index }) => <PetListItem pet={item} />}
      />
    </View>
  );
}
