import * as dotenv from 'dotenv';
dotenv.config();

const serviceAccount = {
  "type": process.env.FIREBASE_CONFIG_TYPE,
  "project_id": process.env.FIREBASE_CONFIG_PROJECTID,
  "private_key_id": process.env.FIREBASE_CONFIG_PRIVATEKEYID,
  "private_key": process.env.FIREBASE_CONFIG_PRIVATEKEY,
  "client_email": process.env.FIREBASE_CONFIG_CLIENTEMAIL,
  "client_id": process.env.FIREBASE_CONFIG_CLIENTID,
  "auth_uri": process.env.FIREBASE_CONFIG_AUTHURI,
  "token_uri": process.env.FIREBASE_CONFIG_TOKENURI,
  "auth_provider_x509_cert_url": process.env.FIREBASE_CONFIG_AUTHPROVIDER,
  "client_x509_cert_url": process.env.FIREBASE_CONFIG_CLIENTCERTURL,
  "universe_domain": process.env.FIREBASE_CONFIG_UNIVERSEDOMAIN,
}

export{serviceAccount}