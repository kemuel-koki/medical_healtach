const mongoose = require('mongoose');

const ConsultationSchema = new mongoose.Schema({
  
  id_patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true

   }?

  date: {
    type: Date,
    required: true
  },
  diagnostic: {
    type: String,
    required: true
  },
  traitement: {
    type: String
  },
  notes: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Consultation', ConsultationSchema);
