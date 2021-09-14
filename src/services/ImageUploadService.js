import FirebaseInstance from "../FirebaseConfig";
import "firebase/firestore";
import "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const UploadImage = async (image, type) => {
  const uploadTask = await FirebaseInstance()
    .storage()
    .ref("images")
    .child(type + "/" + uuidv4())
    .put(image);
  return await uploadTask.ref.getDownloadURL();
};

export default UploadImage;
