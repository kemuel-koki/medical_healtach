// controllers/ConsultationsController.js

const Consultation = require('../models/consultation');
const Patient = require('../models/Patient'); // MAJUSCULE et chemin relatif



// POST /consultations
exports.createConsultation = async (req, res, next) => {
  try {
    const { id_patient, date, diagnostic, traitement, notes } = req.body;

    // Vérification des champs obligatoires
    if (!id_patient || !date || !diagnostic) {
      return res.status(400).json({ message: "id_patient, date et diagnostic sont obligatoires." });
    }

    // Vérifie que le patient existe
    const patientExists = await Patient.findById(id_patient);
    if (!patientExists) {
      return res.status(404).json({ message: "Patient non trouvé." });
    }

    // Création de la consultation
    const consultation = await Consultation.create({ id_patient, date, diagnostic, traitement, notes });
    res.status(201).json(consultation);

  } catch (error) {
    console.error(error);
    next(error);
  }
};

// GET /consultations?patient=ID&du=&au=
exports.getConsultations = async (req, res, next) => {
  try {
    const { patient, du, au } = req.query;
    let filter = {};

    if (patient) filter.id_patient = Patient;
    if (du || au) filter.date = {};
    if (du) filter.date.$gte = new Date(du);
    if (au) filter.date.$lte = new Date(au);

    // Récupération des consultations avec infos patient
    const consultations = await Consultation.find(filter)
      .populate('id_patient', 'nom prenom date_naissance sexe'); // champs du patient

    res.json(consultations);

  } catch (error) {
    console.error(error);
    next(error);
  }
};

// GET /stats/consultations-par-mois
exports.getConsultationsParMois = async (req, res, next) => {
  try {
    const stats = await Consultation.aggregate([
      {
        $group: {
          _id: { $month: "$date" }, // regroupe par mois
          total: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } } // tri par mois croissant
    ]);

    res.json(stats);

  } catch (error) {
    console.error(error);
    next(error);
  }
};
