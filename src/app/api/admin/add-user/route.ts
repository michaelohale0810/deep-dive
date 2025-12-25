import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin if not already initialized
if (getApps().length === 0) {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
  
  if (serviceAccount) {
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
        { error: 'Firebase Admin not configured' },
        { status: 500 }
      );
    }

    const auth = getAuth();
    const db = getFirestore();
    
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

    // Add to whitelist
    await db.collection('approvedUsers').doc(user.uid).set({
      uid: user.uid,
      email: user.email?.toLowerCase().trim(),
      approved: true,
      approvedAt: new Date(),
      approvedBy: 'admin',
    }, { merge: true });

    return NextResponse.json({ 
      success: true,
      uid: user.uid,
      email: user.email 
    });
  } catch (error: any) {
    console.error('Error adding user to whitelist:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to add user to whitelist' },
      { status: 500 }
    );
  }
}

