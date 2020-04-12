import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import FIREBASE_CONFIG from './firebase.config';

// Initialize Firebase with the config key
firebase.initializeApp(FIREBASE_CONFIG);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

// Setup Google sign-in with popup
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({promt : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

/*
    This method checks firebase for the user, and if it doesn't
    exists, it creates a record.

    This method uses a lot of asynchronous functions in firebase, 
    so those will have the await keyword in front to synchronize.
*/
export const createUserProfileDocument = async(userAuth, additionalData) => {

    if (!userAuth) return; // If user didn't sign in, do nothing.

    const userRef = await firestore.doc(`users/${userAuth.uid}`); 

    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        
        const {displayName,  email} = userAuth;
        const createdDate = new Date();

        try {

            //console.log("Creating new profile in firebase...");

            await userRef.set({
                displayName,
                email,
                createdDate,
                ...additionalData
            })    

        }
        catch (error) {
            console.log("Error creating user profile.", error);
        }
    }

    return userRef;

}


export const addCollectionAndDocuments = async (collectionKey, ObjectsToAdd) => {

    const collectionRef = firestore.collection(collectionKey);
    
    const batch = firestore.batch();

    ObjectsToAdd.forEach( obj => {

        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    
    });

    return await batch.commit();

}

export const convertCollectionSnapshotToMap = (collectionsSnapshot) => {

    const newCollection = collectionsSnapshot.docs.map(
        doc => {
            const {title, items} = doc.data();
            return  {
                id: doc.id,
                title,
                routeName: encodeURI(title.toLowerCase()),
                items
            };
        }
    );

    // This reducer is creating a map of the collections whose 
    // keys are the collection titles. 
    return newCollection.reduce( 
        (accumulator, collection) => {
            accumulator[collection.title.toLowerCase()] = collection;
            return accumulator;
        }, 
        {} // 2nd parameter to reduce() func is an empty object
    );

}


export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged( 
            userAuth => {
                unsubscribe();
                resolve(userAuth);
            }, 
            reject
        )}
    );
}

export default firebase;