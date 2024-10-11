const mongoose = require('mongoose');
const Document = require('../models/Document');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
.then(async () => {
  console.log('Connexion à la base de données réussie');

  const documents = [
    {
      title: 'Document 1',
      content: 'Contenu du document 1...',
    },
    {
      title: 'Document 2',
      content: 'Contenu du document 2...',
    },
    // Ajoutez d'autres documents
  ];

  await Document.insertMany(documents);
  console.log('Documents importés avec succès');
  process.exit(0);
})
.catch((err) => {
  console.error('Erreur de connexion à la base de données', err);
  process.exit(1);
});