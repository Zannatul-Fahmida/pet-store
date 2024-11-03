import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db, storage } from "../../config/FirebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { Pressable } from "react-native";
import { ToastAndroid } from "react-native";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function AddNewPet() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    category: "Dogs",
    sex: "Male",
    label: "None",
  });
  const [label, setLabel] = useState("None");
  const [gender, setGender] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [image, setImage] = useState();
  const [loader, setLoader] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Pet",
    });
    getCategories();
  }, []);

  const handleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const getCategories = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, "Category"));
    snapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  //   used to pick image from gallery
  const imgPicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = () => {
    if (Object.keys(formData).length != 9) {
      ToastAndroid.show("Enter all details", ToastAndroid.SHORT);
      return;
    }
    uploadImg();
  };

  //   used to upload pet image to firebase storage (server)
  const uploadImg = async () => {
    setLoader(true);
    const res = await fetch(image);
    const blobImg = await res.blob();
    const storageRef = ref(storage, "/PetAdopt/" + Date.now() + ".jpg");

    uploadBytes(storageRef, blobImg)
      .then((snapshot) => {
        console.log("File uploaded");
      })
      .then((res) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          console.log(downloadUrl);
          saveFormData(downloadUrl);
        });
      });
  };

  const saveFormData = async (imgUrl) => {
    const docId = Date.now().toString();
    await setDoc(doc(db, "Pets", docId), {
      ...formData,
      imgUrl: imgUrl,
      userName: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      userImg: user?.imageUrl,
      id: docId,
    });
    setLoader(false);
    router.replace("/(tabs)/home");
  };

  return (
    <ScrollView
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "sofadi",
          fontSize: 20,
        }}
      >
        Add new pet for adoption
      </Text>
      <Pressable
        onPress={imgPicker}
        style={{
          marginVertical: 10,
        }}
      >
        {!image ? (
          <Image
            source={require("../../assets/images/paw.png")}
            style={{
              width: 100,
              height: 100,
            }}
          />
        ) : (
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
            }}
          />
        )}
      </Pressable>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Name *</Text>
        <TextInput
          placeholder="Pet Name"
          style={styles.input}
          onChangeText={(value) => handleInputChange("name", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Category *</Text>
        <Picker
          selectedValue={selectedCategory}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedCategory(itemValue);
            handleInputChange("category", itemValue);
          }}
        >
          {categoryList.map((category, index) => (
            <Picker.Item
              key={index}
              label={category.name}
              value={category.name}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Label (Featured/Urgent/Top) *</Text>
        <Picker
          selectedValue={label}
          style={styles.input}
          onValueChange={(itemValue) => {
            setLabel(itemValue);
            handleInputChange("label", itemValue);
          }}
        >
          <Picker.Item label="None" value="None" />
          <Picker.Item label="Featured" value="Featured" />
          <Picker.Item label="Urgent" value="Urgent" />
          <Picker.Item label="Top" value="Top" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Breed *</Text>
        <TextInput
          placeholder="Breed"
          style={styles.input}
          onChangeText={(value) => handleInputChange("breed", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age *</Text>
        <TextInput
          keyboardType="number-pad"
          placeholder="Age"
          style={styles.input}
          onChangeText={(value) => handleInputChange("age", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender *</Text>
        <Picker
          selectedValue={gender}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => {
            setGender(itemValue);
            handleInputChange("sex", itemValue);
          }}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight *</Text>
        <TextInput
          keyboardType="number-pad"
          placeholder="Weight"
          style={styles.input}
          onChangeText={(value) => handleInputChange("weight", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address *</Text>
        <TextInput
          placeholder="Address"
          style={styles.input}
          onChangeText={(value) => handleInputChange("address", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>About *</Text>
        <TextInput
          placeholder="About"
          style={styles.input}
          numberOfLines={5}
          multiline={true}
          onChangeText={(value) => handleInputChange("about", value)}
        />
      </View>
      <TouchableOpacity
        disabled={loader}
        style={styles.button}
        onPress={onSubmit}
      >
        {loader ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <Text
            style={{
              fontFamily: "inter",
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            Submit
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
  },
  input: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 7,
  },
  label: {
    marginVertical: 5,
    fontFamily: "inter",
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 7,
    padding: 15,
    marginBottom: 50,
  },
});
