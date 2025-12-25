# ZeroCard

ZeroCard makes spending cryptocurrency as easy as using cash.

We simplify the crypto experience by:

1.  **Setting up your wallet:** Get a secure crypto wallet with just your email.
2.  **Issuing your card:** Receive a physical or virtual card linked to your wallet.
3.  **Seamless Spending:** Use your ZeroCard anywhere cards are accepted, effortlessly spending your crypto like local currency (Naira, Cedis, Shillings, and more).

No more complex conversions or high fees – just simple, straightforward crypto spending for everyday life.

**Currently focusing on bringing easy crypto spending to Nigeria, Ghana, and Kenya.**

## Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project

### Firebase Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database in your Firebase project
3. Create a `.env.local` file in the root directory with your Firebase configuration:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
```

You can find these values in Firebase Console > Project Settings > General > Your apps.

### Installation

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:3000`.
