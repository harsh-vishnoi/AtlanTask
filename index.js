const express = require('express');
const app = express();

const upload = require('./Routes/upload.js');
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

app.get('/', function(req, res){
  res.send("Run /auth/signup or /auth/signin to upload files.")
})
app.use('/upload', upload);
app.use('/auth', auth);

app.listen(3000, function(){
  console.log("Listening at PORT :: 3000");
})
