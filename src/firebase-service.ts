import firebase from 'firebase/app';

import 'firebase/firestore';

export interface FirebaseConfig {
  apiKey: string;
  projectId: string;
  appId: string;
  authDomain: string;
  databaseURL: string;
  storageBucket: string;
  messagingSenderId: string;
  measurementId: string;
}

export interface FirebaseServiceOptions {
  analytics?: boolean;
}

export function initializeFirebase(config: FirebaseConfig, { analytics = true }: FirebaseServiceOptions = {}) {
  const isApp = firebase.apps.length;
  const app = !isApp ? firebase.initializeApp(config) : firebase.app();

  if (!isApp) {
    if (analytics) {
      firebase.analytics();
    }
  }

  return { app, firebase };
}
