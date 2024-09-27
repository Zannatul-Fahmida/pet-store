import { View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Shared from "../Shared/Shared";
import { useUser } from "@clerk/clerk-expo";

export default function MarkFav({ pet, onUpdate, color='black' }) {
  const { user } = useUser();
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    if (user) {
      GetFav();
    }
  }, [user]);

  const GetFav = async () => {
    const result = await Shared.GetFavList(user);
    setFavList(result?.favorites || []);
  };

  const AddToFav = async () => {
    const newFavList = [...favList, pet.id];
    await Shared.UpdateFav(user, newFavList);
    setFavList(newFavList); 
    if (onUpdate) onUpdate(newFavList); 
  };

  const removeFromFav = async () => {
    const newFavList = favList.filter((item) => item !== pet.id);
    await Shared.UpdateFav(user, newFavList);
    setFavList(newFavList);
    if (onUpdate) onUpdate(newFavList);
  };

  const isFav = favList.includes(pet.id);

  return (
    <View>
      <Pressable onPress={isFav ? removeFromFav : AddToFav}>
        <Ionicons 
          name={isFav ? "heart" : "heart-outline"} 
          size={30} 
          color={isFav ? "red" : color} 
        />
      </Pressable>
    </View>
  );
}
