  
import * as admin from 'firebase-admin';
    var serviceAccount = require('./serviceAccountKey.json');
    
    function conn(){
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      })
    } 
  
  
export {conn}