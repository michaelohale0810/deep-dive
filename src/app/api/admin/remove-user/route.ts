import { NextRequest, NextResponse } from 'next/server';
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
    const { uid } = await request.json();

    if (!uid || typeof uid !== 'string') {
      return NextResponse.json(
        { error: 'UID is required' },
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

    const db = getFirestore();
    
    // Remove from whitelist
    await db.collection('approvedUsers').doc(uid).delete();

    return NextResponse.json({ 
      success: true,
      message: 'User removed from whitelist'
    });
  } catch (error: any) {
    console.error('Error removing user from whitelist:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to remove user from whitelist' },
      { status: 500 }
    );
  }
}

