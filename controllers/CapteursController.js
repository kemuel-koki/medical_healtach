// controllers/CapteursController.js
import fs from "fs";
import path from "path";
import Capteur from "../models/Capteur.js";

const dataPath = path.resolve("data", "capteurs.json");

export const createCapteur = async (req, res, next) => {
  try {
    const { id_patient, rythme_cardiaque, sommeil, stress, timestamp } = req.body;

    if (
      !id_patient ||
      rythme_cardiaque === undefined ||
      sommeil === undefined ||
      stress === undefined
    ) {
      return res
        .status(400)
        .json({ message: "id_patient, rythme_cardiaque, sommeil, stress obligatoires." });
    }

    const capteur = await Capteur.create({
      id_patient,
      rythme_cardiaque,
      sommeil,
      stress,
      timestamp,
    });

    // écrire aussi dans capteurs.json (exigence du projet)
    let jsonData = [];
    if (fs.existsSync(dataPath)) {
      const raw = fs.readFileSync(dataPath, "utf-8");
      if (raw) jsonData = JSON.parse(raw);
    }

    jsonData.push({
      id_patient: capteur.id_patient,
      rythme_cardiaque: capteur.rythme_cardiaque,
      sommeil: capteur.sommeil,
      stress: capteur.stress,
      timestamp: capteur.timestamp,
    });

    fs.writeFileSync(dataPath, JSON.stringify(jsonData, null, 2), "utf-8");

    res.status(201).json(capteur);
  } catch (err) {
    next(err);
  }
};

export const getCapteurs = async (req, res, next) => {
  try {
    const { patient, freqMin } = req.query;

    const filter = {};
    if (patient) filter.id_patient = patient;
    if (freqMin) filter.rythme_cardiaque = { $gte: Number(freqMin) };

    const capteurs = await Capteur.find(filter).populate("id_patient");

    res.json(capteurs);
  } catch (err) {
    next(err);
  }
};

// moyenne du rythme par patient
export const getStatsRythmeCardiaque = async (req, res, next) => {
  try {
    const stats = await Capteur.aggregate([
      {
        $group: {
          _id: "$id_patient",
          rythme_moyen: { $avg: "$rythme_cardiaque" },
          mesures: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "patients",            // nom de la collection Mongo
          localField: "_id",
          foreignField: "_id",
          as: "patient",
        },
      },
      { $unwind: "$patient" },
      {
        $project: {
          _id: 0,
          id_patient: "$patient._id",
          nom: "$patient.nom",
          prenom: "$patient.prenom",
          rythme_moyen: 1,
          mesures: 1,
        },
      },
    ]);

    res.json(stats);
  } catch (err) {
    next(err);
  }
};
