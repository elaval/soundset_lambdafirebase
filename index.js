const admin = require('firebase-admin');
const http = require('http');

//const FIREBASE_PRIVATE_KEY = JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
const TRIGGER_URL = process.env.TRIGGER_URL || "http://157.230.221.169:5000/trigger";
console.log(`Trigger url: ${TRIGGER_URL}`);

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: 'soundset-abffd',
    clientEmail: 'firebase-adminsdk-sz6e6@soundset-abffd.iam.gserviceaccount.com',
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
      bucket: bucket,
      key: key,
      unlocked: true
    };

    const setDoc = dbStore.collection('jobsPending').add(data);
  }
  triggerAnalysisProcess();
  callback(null, JSON.stringify(event));
};

function triggerAnalysisProcess() {
  http.get(TRIGGER_URL, (response) => {
    response.on('data', (data) => {
      const parsedData = JSON.parse(data);
      console.log(parsedData);
    })    
    response.on('end', () => {
      console.log("END TRIGGER")
    })
  })
  .on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
}
