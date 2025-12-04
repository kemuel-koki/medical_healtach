import mongoose from "mongoose";

const capteurSchema = new mongoose.Schema(
  {
    id_patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    rythme_cardiaque: {
      type: Number,
      required: true,
      min: 0,
      max: 250,
    },
    sommeil: {
      type: Number, // heures de sommeil
      required: true,
      min: 0,
      max: 24,
    },
    stress: {
      type: Number, // 0 à 100
      required: true,
      min: 0,
      max: 100,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Capteur = mongoose.model("Capteur", capteurSchema);

export default Capteur;
