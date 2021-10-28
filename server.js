const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('./cert/notesapp-88bcc-5ae186c94d65.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

app.use(cors());

app.get('/categories', (req, res) => {
  const mockupCategories = [
    {name: 'Animals', notes: [
      {name: 'Horse', description: 'I am a horse :D'},
      {name: 'Cat', description: 'I am a cat :D'},
      {name: 'Fish', description: 'Fishlex'},
    ]},
    {name: 'Vegetables', notes: [
      {name: 'Potato', description: 'I am a potat :D'},
      {name: 'Cabbage', description: 'I am a cabbage :D'},
      {name: 'Onion', description: 'Onion :D'},
    ]},
  ];

  const docRef = db.collection('categories').doc('animals');

  const addData = async () => {
    await docRef.set({
      name: 'Cat',
    });
    
  }
  addData();
  console.log('Added data...');

  res.json(mockupCategories);
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});

// category {name: string, notices: [Notice: {name: string, description}]}
