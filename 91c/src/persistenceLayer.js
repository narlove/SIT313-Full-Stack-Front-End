import { FirebaseError, initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, setDoc, getDocs, doc, getDoc, onSnapshotsInSync, deleteDoc } from "firebase/firestore";
import { get, getDatabase, ref, set, child } from "firebase/database";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { AdvancedImage } from "@cloudinary/react";

// learnt this from 331 - backend dev
class PersistenceLayer {
    database = null;
    app = null;
    // if you change this do not change it to a "." or any other key protected char
    // in firebase bc otherwise it defeats the purpose.
    // oh and dont use "/", it furthers the path, i found that out the hard way lol
    dotChar = "!d";
    cld = null;
    imageUploadUrl = "https://api.cloudinary.com/v1_1/dwfmsy7vw/image/upload"
    imageDeleteUrl = "https://api.cloudinary.com/v1_1/dwfmsy7vw/image/destroy"

    // my app uses vite instead of create-react-router because vite is not deprecated
    // because of this, we can use the built in vite .env file instead
    static firebaseConfig = {
        apiKey: import.meta.env.VITE_API_KEY,
        authDomain: import.meta.env.VITE_AUTH_DOMAIN,
        databaseURL: import.meta.env.VITE_DATABASE_URL,
        projectId: import.meta.env.VITE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_APP_ID
    };

    constructor() {
        this.app = initializeApp(PersistenceLayer.firebaseConfig);
        this.database = getFirestore(this.app);

        this.cld = new Cloudinary({
            cloud: {
                cloudName: 'dwfmsy7vw'
            }
        });
    }

    // write data
    async writeData(path, key, valueObject) {
        // have to implement this bc it doesnt appreciate dots in the name
        // and obviously emails contain dots
        const keySafe = key.replaceAll(".", this.dotChar);

        try {
            await setDoc(doc(this.database, path, keySafe), valueObject);
        } catch (err) {
            console.error(err);
            throw new FirebaseError(`something went wrong while uploading data to path, key: ${path + "/" + keySafe}. err: ${err.message}`);
        }
    }

    async writeDataNoKey(path, valueObject) {
        try {
            await addDoc(collection(this.database, path), valueObject);
        } catch (err) {
            console.error(err);
            throw new FirebaseError(`something went wrong while uploading data to path, key: ${path}. err: ${err.message}`);
        }
    }

    // read data
    // btw this code comes from the firebase api docs
    async readData(path, key) {
        const keySafe = key.replaceAll(".", this.dotChar);
        const docRef = doc(this.database, path, keySafe);

        // again, another async bc FIREBASE RETURNS A PROMISE DAMNIT
        try {
            const snapshot = await getDoc(docRef);

            if (snapshot.exists()) {
                return snapshot.data();
            } else {
                return null;
            }
        } catch (err) {
            console.error(err);
            throw new FirebaseError(`something went wrong while reading from path, key: ${path + "/" + keySafe}. err: ${err.message}`);
        }
    }

    async deleteImageUnsigned(publicId) {
        // couldn't be bothered deleteing the image, it looks like i have to do it
        // signed...
        // welp, users content is mine now i guess
    }

    // DO NOT USE FOR USERS. USERS CANNOT BE DELETED EXCEPT FOR MANUALLY.
    // THIS IS ONLY FOR QUESTIONS
    async deleteData(path, key) {
        const data = await this.readData(path, key);

        if (data.thumbnailRef) {
            await this.deleteImageUnsigned(data.thumbnailRef);
        }

        await deleteDoc(doc(this.database, path, key));
    }

    // nice and coated for ease of access
    async isPasswordMatch(email, attemptPassword) {
        const userObject = await this.readData("users", email);

        if (userObject == null || !userObject) return false;

        return userObject.password === attemptPassword;
    }

    async getAll(path) {
        try {
            const snapshot = await getDocs(collection(this.database, path));
            const returnData = [];

            snapshot.forEach(doc => {
                returnData.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return returnData;
        } catch (err) {
            console.error(err);
            throw new FirebaseError(`something went wrong while reading all documents from path: ${path}. err: ${err.message}`);
        }
    }

    async uploadImage(image) {
        const formData = new FormData();

        formData.append('file', image);
        formData.append('upload_preset', 'ml_default');

        try {
            const response = await fetch(this.imageUploadUrl, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            return data.public_id || null;
        } catch (err) {
            console.error('Image upload failed:', err);
            return null;
        }
    }

    retrieveImage(id) {
        return this.cld.image(id);//.format('auto').quality('auto'); //.resize
    }

    async doesUserExist(email) {
        const userObj = await this.readData("users", email);

        return userObj !== null;
    }
};

export {
    PersistenceLayer
};