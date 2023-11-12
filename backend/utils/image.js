import {v4} from 'uuid'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../configs/firebase_configuration.js'
import { BadRequestError } from '../utils/custom_errors.js'

export const deleteImage = async (imageUrl) => {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
    console.log(`Image at ${imageUrl} has been deleted.`);
  } catch (error) {
    if (error.code === 'storage/object-not-found') {
      console.error('The image does not exist.');
    } else {
      console.error('An error occurred while deleting the image:', error);
    }
  }
}

export const uploadImage = async (file, path, required) => {
    if(required && !file) throw new BadRequestError('Image is Required')
    try {
        const fileName = `${v4()}`
        const storageRef = ref(storage, `${path}/${fileName}`)
        const metadata = {
            contentType: file.minetype
        }
        const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata)
        const imageUrl = await getDownloadURL(snapshot.ref)
        return imageUrl
    } catch (error) {
        throw new BadRequestError('There was an Error uploading your image to the database!')
    }
}