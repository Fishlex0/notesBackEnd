const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

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

  res.json(mockupCategories);
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});

// category {name: string, notices: [Notice: {name: string, description}]}
