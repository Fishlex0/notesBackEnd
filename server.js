const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const categoriesRouter = require('./routes/index');

// CORS CONFIG
app.use(cors());

// ROUTES
app.use(categoriesRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});

// category {name: string, notices: [Notice: {name: string, description}]}
