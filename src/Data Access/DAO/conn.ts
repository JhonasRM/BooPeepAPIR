
    var admin = require("firebase-admin");
  
    var serviceAccount = require('./serviceAccountKey.json');
    
    function conn(){
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } 
  
  
export {conn}