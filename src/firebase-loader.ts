import { FirebaseConfig, FirebaseService, FirebaseServiceOptions } from './firebase-service';

export async function loadFirebase(config: FirebaseConfig, options: FirebaseServiceOptions): Promise<FirebaseService> {
  const { initializeFirebase } = await import('./firebase-service');

  const servicesPromises: Promise<unknown>[] = [];

  if (options.analytics) {
    servicesPromises.push(import('firebase/analytics'));
  }
  if (options.firestore) {
    servicesPromises.push(import('firebase/firestore'));
  }
  if (options.auth) {
    servicesPromises.push(import('firebase/auth'));
  }

  await Promise.all(servicesPromises);

  return initializeFirebase(config, options);
}
