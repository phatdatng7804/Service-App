const admin = require("firebase-admin");
const serviceAccount = require("../../firebase-service-account");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;
