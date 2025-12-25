import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

// Initialize Firebase Admin if not already initialized
if (getApps().length === 0) {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
  
  if (!serviceAccount) {
    console.error('FIREBASE_SERVICE_ACCOUNT environment variable is not set');
  } else {
    try {
      const serviceAccountJson = JSON.parse(serviceAccount);
      initializeApp({
        credential: cert(serviceAccountJson),
      });
    } catch (error) {
      console.error('Error initializing Firebase Admin:', error);
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if Firebase Admin is initialized
    if (getApps().length === 0) {
      return NextResponse.json(
        { error: 'Firebase Admin not configured. Please set FIREBASE_SERVICE_ACCOUNT environment variable.' },
        { status: 500 }
      );
    }

    const auth = getAuth();
    
    // Look up user by email
    let user;
    try {
      user = await auth.getUserByEmail(email.toLowerCase().trim());
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        return NextResponse.json(
          { error: 'User not found in Firebase Auth. User must be created in Auth first.' },
          { status: 404 }
        );
      }
      throw error;
    }

    return NextResponse.json({ 
      uid: user.uid,
      email: user.email 
    });
  } catch (error: any) {
    console.error('Error getting user UID:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get user UID' },
      { status: 500 }
    );
  }
}

