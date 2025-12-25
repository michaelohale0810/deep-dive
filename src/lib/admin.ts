import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Add a user to the whitelist by UID
 * User must already exist in Firebase Auth
 */
export const addUserToWhitelist = async (
  uid: string,
  email: string,
  approvedBy?: string
): Promise<void> => {
  try {
    await setDoc(
      doc(db, 'approvedUsers', uid),
      {
        uid,
        email: email.toLowerCase().trim(),
        approved: true,
        approvedAt: serverTimestamp(),
        approvedBy: approvedBy || 'admin',
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Error adding user to whitelist:', error);
    throw error;
  }
};

/**
 * Remove a user from the whitelist by UID
 */
export const removeUserFromWhitelist = async (uid: string): Promise<void> => {
  try {
    const { deleteDoc } = await import('firebase/firestore');
    await deleteDoc(doc(db, 'approvedUsers', uid));
  } catch (error) {
    console.error('Error removing user from whitelist:', error);
    throw error;
  }
};

