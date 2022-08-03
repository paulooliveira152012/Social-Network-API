//import mongoose and express
const mongoose = require('mongoose');
const express = require('express');
              // const routes = require('./routes');

//setting up express as a const
const app = express();
//setting up Port 3001
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));

//requireing routes
              // app.use(routes);
              app.use(require('./routes'));

//setting up mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));

