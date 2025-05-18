import { FirebaseApp } from 'firebase/app';
import { Analytics } from 'firebase/analytics';
import { Firestore } from 'firebase/firestore';

export const app: FirebaseApp;
export const analytics: Analytics | undefined;
export const db: Firestore; 