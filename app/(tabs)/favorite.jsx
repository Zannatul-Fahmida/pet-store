import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../constants/Colors";
import Shared from "../../Shared/Shared";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import PetListItem from "../../components/Home/PetListItem";

export default function Favorite() {
  const { user } = useUser();
  const [favIds, setFavIds] = useState([]);
  const [favPetList, setFavPetList] = useState([]);
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    if (user) {
      GetFavPetIds();
    }
  }, [user]);

  const GetFavPetIds = async () => {
    setLoader(true)
    const result = await Shared.GetFavList(user);
    setFavIds(result?.favorites || []);
    setLoader(false)
  };

  useEffect(() => {
    if (favIds.length > 0) {
      GetFavPetList();
    }
  }, [favIds]); 

  const GetFavPetList = async () => {
    setLoader(true)
    const q = query(collection(db, "Pets"), where("id", "in", favIds));
    const querySnapshot = await getDocs(q);
    const pets = [];
    querySnapshot.forEach((doc) => {
      pets.push(doc.data());
    });
    setFavPetList(pets); 
    setLoader(false)
  };

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text
        style={{
          fontFamily: "sofadi",
          fontSize: 27,
          color: Colors.PINK,
          fontWeight: "bold",
        }}
      >
        Favorites
      </Text>
      <FlatList
        data={favPetList}
        numColumns={2}
        onRefresh={GetFavPetIds}
        refreshing={loader}
        keyExtractor={(item) => item.id} 
        renderItem={({ item }) => (
          <View style={{ width: '50%'  }}>
            <PetListItem pet={item} />
          </View>
        )}
      />
    </View>
  );
}
