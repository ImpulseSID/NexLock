import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import dotenv from "dotenv";
import serviceAccount from "./serviceAccount.js";

dotenv.config();
const app = express();
const port = 3001;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Get Firestore database reference
const db = admin.firestore();

// Middleware
app.use(cors());
app.use(express.json());

// GET all passwords from Firestore
app.get("/api/passwords", async (req, res) => {
  try {
    const snapshot = await db.collection("passwords").get();
    let passwords = [];
    snapshot.forEach((doc) => {
      passwords.push({ id: doc.id, ...doc.data() });
    });
    res.json(passwords);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching passwords", error: error.message });
  }
});

// GET a specific password by ID from Firestore
app.get("/api/passwords/:id", async (req, res) => {
  try {
    const doc = await db.collection("passwords").doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Password not found" });
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching password", error: error.message });
  }
});

// POST a new password to Firestore
app.post("/api/passwords", async (req, res) => {
  try {
    const newPassword = req.body;
    const docRef = await db.collection("passwords").add(newPassword);
    const createdDoc = await docRef.get();
    res.status(201).json({ id: docRef.id, ...createdDoc.data() });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving password", error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Password server running on port ${port}`);
});
