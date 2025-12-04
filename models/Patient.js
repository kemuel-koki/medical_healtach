import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  date_naissance: { type: Date, required: true },
  sexe: { type: String, enum: ["H", "F"], required: true },
  allergies: { type: [String], default: [] },
  maladies_chroniques: { type: [String], default: [] }
});

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
