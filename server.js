import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import patientRoutes from "./routes/patients.routes.js";
import capteursRoutes from "./routes/capteurs.routes.js"; 


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.error("Erreur connexion MongoDB :", err));

// Routes Patients
app.use("/patients", patientRoutes);
app.use("/capteurs", capteursRoutes);

// Lancement serveur
const PORT = 5001;
app.listen(PORT, () => {
  console.log(` Serveur lancé sur http://localhost:${PORT}`);
});
