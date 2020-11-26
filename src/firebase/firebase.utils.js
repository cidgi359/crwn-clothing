import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDtnwGYTpceA5IS9WJFoNIAFeg4Sg-FkG4",
  authDomain: "crwn-db-e76d5.firebaseapp.com",
  databaseURL: "https://crwn-db-e76d5.firebaseio.com",
  projectId: "crwn-db-e76d5",
  storageBucket: "crwn-db-e76d5.appspot.com",
  messagingSenderId: "869650593424",
  appId: "1:869650593424:web:e228ebcecc02bf14074a15"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
