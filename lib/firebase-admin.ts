import { initFirestore } from "@auth/firebase-adapter";
import admin from "firebase-admin";

const firebaseCredentials = admin.credential.cert({
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
});

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: firebaseCredentials,
  });
}

const adminDb = initFirestore({ credential: firebaseCredentials });

const adminAuth = admin.auth();

export { adminDb, adminAuth };
