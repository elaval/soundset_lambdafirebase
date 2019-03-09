const admin = require('firebase-admin');

const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: 'soundset-abffd',
    clientEmail: 'firebase-adminsdk-zrq83@soundset-abffd.iam.gserviceaccount.com',
    privateKey: FIREBASE_PRIVATE_KEY
  }),

});

var db = admin.firestore();

var data = {
  lastEvent: new Date()
};

// Add a new document in collection "cities" with ID 'LA'
var setDoc = db.collection('test').doc('LA').set(data);
console.log("DONE")
