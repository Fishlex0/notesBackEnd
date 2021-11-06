const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const notesRoutes = require('./routes/notesRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const usersRoutes = require('./routes/usersRoutes');

const authMiddleware = require('./middleware/authMiddleware');

const port = 3001;
const app = express();

// CORS CONFIG
app.use(cors());
// PARSE COOKIES
app.use(cookieParser());
// PARSE REQUEST BODY
app.use(express.json());
app.use(authMiddleware.isLoggedIn);

// ROUTES
app.use(usersRoutes);
app.use('/categories', categoriesRoutes);
app.use('/notes', notesRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
