import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  User
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, addDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWrCztb9Zlpiz5mtkGQ1QR18QR9G0Lpyg",
  authDomain: "ecocalipsis.firebaseapp.com",
  projectId: "ecocalipsis",
  storageBucket: "ecocalipsis.firebasestorage.app",
  messagingSenderId: "996094633219",
  appId: "1:996094633219:web:2795005700544a5d037536"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app, "ai-studio-ecocalipsislalti-c93b134d-64cc-4c2f-8e61-babf54c874f7");

// Initialize Analytics if in browser environment
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export async function getStudentProfile(uid: string): Promise<any | null> {
  try {
    const docRef = doc(db, "students", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (error) {
    console.error("Error reading student profile from Firestore:", error);
  }
  return null;
}

export async function saveStudentProfile(uid: string, profile: any): Promise<void> {
  try {
    const docRef = doc(db, "students", uid);
    await setDoc(docRef, profile, { merge: true });
  } catch (error) {
    console.error("Error writing student profile to Firestore:", error);
  }
}

export async function saveSurveyResult(result: any): Promise<void> {
  try {
    const collRef = collection(db, "survey_results");
    await addDoc(collRef, result);
  } catch (error) {
    console.error("Error writing survey result to Firestore:", error);
  }
}

export { signInWithPopup, signOut, onAuthStateChanged };
export type { User };
