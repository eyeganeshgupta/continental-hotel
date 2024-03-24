import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { firebaseApp } from "./firebase";

export const uploadImageToFirebaseAndReturnUrls = async (files: File[]) => {
  try {
    // TODO: upload images to firebase storage
    const storage = getStorage(firebaseApp);
    const uploadedImagesRefs = await Promise.all(
      files.map(async (file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        return storageRef;
      })
    );

    // TODO: get the urls of the images uploaded
    const urls = await Promise.all(
      uploadedImagesRefs.map(async (ref) => {
        const url = await getDownloadURL(ref);
        return url;
      })
    );

    return urls;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
