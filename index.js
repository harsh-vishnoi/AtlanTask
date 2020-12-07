const express = require('express');
const app = express();

const upload = require('./Routes/upload.js');
// const exp = require('./Routes/export.js');
const auth = require('./Routes/auth.js');

const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

mongoose.connect(db, {
  useNewUrlParser : true,
  useCreateIndex : true,
  useFindAndModify : false
}).then(() => {
  console.log('MongoDB Connected ... ')
}).catch( err => {
  console.log(err)
});

app.use(express.json());

// app.use('/export', exp);
app.use('/upload', upload);
app.use('/auth', auth);

app.listen(3000, function(){
  console.log("Listening at PORT :: 3000");
})
