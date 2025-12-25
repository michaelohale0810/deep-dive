import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface ApprovedUser {
  uid: string;
  email: string;
  approved: boolean;
  approvedAt: Date;
  approvedBy?: string;
}

/**
 * Check if a user (by UID) is approved
 */
export const isUserApproved = async (uid: string): Promise<boolean> => {
  try {
    const userDoc = await getDoc(doc(db, 'approvedUsers', uid));
    if (!userDoc.exists()) {
      return false;
    }
    const userData = userDoc.data();
    return userData?.approved === true;
  } catch (error) {
    console.error('Error checking whitelist:', error);
    return false;
  }
};

/**
 * Get all approved users
 */
export const getAllApprovedUsers = async (): Promise<ApprovedUser[]> => {
  try {
    const { collection, getDocs } = await import('firebase/firestore');
    const querySnapshot = await getDocs(collection(db, 'approvedUsers'));
    return querySnapshot.docs.map(doc => ({
      uid: doc.id,
      ...doc.data(),
      approvedAt: doc.data().approvedAt?.toDate() || new Date(),
    })) as ApprovedUser[];
  } catch (error) {
    console.error('Error fetching approved users:', error);
    return [];
  }
};

