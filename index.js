const admin = require('firebase-admin');

//const FIREBASE_PRIVATE_KEY = JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: 'soundset-abffd',
    clientEmail: 'firebase-adminsdk-zrq83@soundset-abffd.iam.gserviceaccount.com',
    privateKey: FIREBASE_PRIVATE_KEY
  }),
  databaseURL: "https://soundset-abffd.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("test");
/*
ref.once("dummy", function(snapshot) {
  console.log(snapshot.val());
});
*/


/*
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: 'soundset-abffd',
    clientEmail: 'firebase-adminsdk-zrq83@soundset-abffd.iam.gserviceaccount.com',
    privateKey: FIREBASE_PRIVATE_KEY
  }),

});


const db = admin.firestore();
*/

exports.handler =  (event, context, callback) => {
  const data = {
    lastEvent: new Date(),
    event: event,
    KEY: FIREBASE_PRIVATE_KEY
  };
  
  // Add a new document in collection "cities" with ID 'LA'
  
  ref.once("value", function(snapshot) {
    console.log(snapshot.val());
  });
  

  //const setDoc = db.collection('test').doc('LA').set(data);
  /*
  var cityRef = db.collection('cities').doc('BJ');

  var setWithOptions = cityRef.set({
    capital: true
  }, { merge: true });
  */

  console.log("DONE");
  console.log(event);
  console.log(FIREBASE_PRIVATE_KEY);

  ref.once("value", function(snapshot) {
    console.log(snapshot.val());
    callback(null, snapshot.val());
  });
  
};



