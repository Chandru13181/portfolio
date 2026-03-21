import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOURKEY",
  authDomain: "portfolio-contact-acd79.firebaseapp.com",
  projectId: "portfolio-contact-acd79",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };