const admin = require("firebase-admin");

if (!admin.apps.length) {
  const raw = process.env.FIREBASE_SERVICE_JSON;
  if (!raw) throw new Error("Missing FIREBASE_SERVICE_JSON env");
  const serviceAccount = JSON.parse(raw);
  // Render escapes newlines in private_key
  if (serviceAccount.private_key) {
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");
  }
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();
module.exports = { admin, db };