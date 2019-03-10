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
/*
// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("test");

*/
const dbStore = admin.firestore();





exports.handler =  (event, context, callback) => {


  for (record of event.Records || []) {
    const bucket = record.s3 && record.s3.bucket && record.s3.bucket.name || "nn";
    const key = record.s3 && record.s3.object && record.s3.object.key || "nn";
    const data = {
      notifiedTime: new Date(),
      eventTime: record.eventTime,
      eventName: record.eventName,
      fullRecord: record,
      bucket: bucket,
      key: key
    };

    const setDoc = dbStore.collection('newFiles').doc(key).set(data);
  }
  callback(null, JSON.stringify(event));
};



