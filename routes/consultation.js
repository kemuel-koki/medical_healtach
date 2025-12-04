const express = require('express');
const router = express.Router();
const {
  createConsultation,
  getConsultations,
  getConsultationsParMois
} = require('../controllers/ConsultationsController'); // le controller à créer

// Ajouter une consultation
router.post('/', createConsultation);

// Récupérer des consultations avec filtres
router.get('/', getConsultations);

// Statistiques par mois
router.get('/stats/consultations-par-mois', getConsultationsParMois);

module.exports = router;
