import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

const isConfigValid = 
  !!firebaseConfig.apiKey && 
  !!firebaseConfig.projectId && 
  !!firebaseConfig.authDomain &&
  firebaseConfig.apiKey !== "your_firebase_key";

let app: FirebaseApp;

if (!getApps().length) {
  if (isConfigValid) {
    if (typeof window !== "undefined") {
      console.log("Firebase initialized with valid config");
    }
    app = initializeApp(firebaseConfig);
  } else {
    // Fallback to dummy to prevent SDK crashes, but log clearly
    if (typeof window !== "undefined") {
      console.warn("Firebase configuration is missing or invalid. Branch: fallback. Check your .env file.", {
        hasApiKey: !!firebaseConfig.apiKey,
        hasProjectId: !!firebaseConfig.projectId,
        hasAuthDomain: !!firebaseConfig.authDomain
      });
    }
    app = initializeApp({ 
      apiKey: "dummy-key", 
      projectId: "dummy-project",
      authDomain: "dummy-project.firebaseapp.com"
    });
  }
} else {
  app = getApps()[0];
}

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, isConfigValid };
