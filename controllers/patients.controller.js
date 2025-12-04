import Patient from "../models/Patient.js";

// ➤ 1. Ajouter un patient (POST /patients)
export const addPatient = async (req, res) => {
  try {
    const newPatient = await Patient.create(req.body);
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ➤ 2. Obtenir les patients + filtres (GET /patients)
export const getPatients = async (req, res) => {
  try {
    const filters = {};

    if (req.query.nom) filters.nom = req.query.nom;
    if (req.query.sexe) filters.sexe = req.query.sexe;

    const result = await Patient.find(filters);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➤ 3. Statistiques d'âge (GET /patients/stats/age)
export const getStatsAge = async (req, res) => {
  try {
    const stats = await Patient.aggregate([
      {
        $project: {
          age: {
            $floor: {
              $divide: [
                { $subtract: [new Date(), "$date_naissance"] },
                1000 * 60 * 60 * 24 * 365
              ]
            }
          }
        }
      },
      {
        $group: {
          _id: "$age",
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
