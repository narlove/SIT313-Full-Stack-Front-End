import { FirebaseError, initializeApp } from "firebase/app";
import { get, getDatabase, ref, set, child } from "firebase/database";

// learnt this from 331 - backend dev
class PersistenceLayer {
    database = null;
    app = null;
    // if you change this do not change it to a "." or any other key protected char
    // in firebase bc otherwise it defeats the purpose.
    // oh and dont use "/", it furthers the path, i found that out the hard way lol
    dotChar = "!d";

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
        this.database = getDatabase(this.app);
    }

    // write data
    writeData(path, key, valueObject) {
        // have to implement this bc it doesnt appreciate dots in the name
        // and obviously emails contain dots
        const keySafe = key.replaceAll(".", this.dotChar);

        set(ref(this.database, path + keySafe), valueObject);
    }

    // read data
    // btw this code comes from the firebase api docs
    async readData(path, key) {
        const keySafe = key.replaceAll(".", this.dotChar);

        const dbRef = ref(this.database);

        // again, another async bc FIREBASE RETURNS A PROMISE DAMNIT
        try {
            const snapshot = await get(child(dbRef, path + keySafe));

            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                return null;
            }
        } catch (err)
        {
            console.error(err);
            throw new FirebaseError(`something went wrong while reading from path, key: ${path + keySafe}. err: ${err.message}`);
        }
    }

    // nice and coated for ease of access
    async isPasswordMatch(email, attemptPassword) {
        const userObject = await this.readData("users/", email);

        if (userObject == null || !userObject) return false;

        return userObject.password === attemptPassword;
    }

    async doesUserExist(email)
    {
        const userObj = await this.readData("users/", email);

        return userObj !== null;
    }
};

export {
    PersistenceLayer
};