import { Firestore } from "@google-cloud/firestore";

export const db = new Firestore({
  projectId: process.env.GCP_PROJECT_ID || "",
  keyFilename: process.env.GCP_KEY_FILE || "",
});
