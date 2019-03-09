const admin = require('firebase-admin');

//const FIREBASE_PRIVATE_KEY = JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: 'soundset-abffd',
    clientEmail: 'firebase-adminsdk-zrq83@soundset-abffd.iam.gserviceaccount.com',
    privateKey: FIREBASE_PRIVATE_KEY
  }),

});

const db = admin.firestore();

exports.handler =  (event, context, callback) => {
  const data = {
    lastEvent: new Date()
  };
  
  // Add a new document in collection "cities" with ID 'LA'
  const setDoc = db.collection('test').doc('LA').set(data);
  console.log("DONE");
  console.log(event);
  console.log(FIREBASE_PRIVATE_KEY);
  callback(null, "DONE");
};



