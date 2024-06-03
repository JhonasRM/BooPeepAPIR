// import { encrypt, decrypt } from './encryption';
// import { firestore, auth } from './firebase';

// async function saveUserData(email: string, password: string) {
//     const encryptedEmail = encrypt(email);
//     const encryptedPassword = encrypt(password);

//     await firestore.collection('users').add({
//         email: encryptedEmail,
//         password: encryptedPassword
//     });

//     await auth.createUser({
//         email: encryptedEmail,
//         password: encryptedPassword
//     });
// }

// async function getUserData(docId: string) {
//     const doc = await firestore.collection('users').doc(docId).get();
//     if (!doc.exists) {
//         console.log('No such document!');
//         return;
//     }
//     const data = doc.data();
//     const decryptedEmail = decrypt(data?.email);
//     const decryptedPassword = decrypt(data?.password);

//     return { email: decryptedEmail, password: decryptedPassword };
// }

// export { saveUserData, getUserData };
