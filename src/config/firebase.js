const admin = require("firebase-admin");
const path = require("path");

const serviceAccountPath = path.join(
  __dirname,
  "firebase-service-account.json"
);

console.log("Using service account file at:", serviceAccountPath);

const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
