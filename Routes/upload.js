const Router = require('express').Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const auth = require('../Middleware/auth');

var JobQueue = {};

Router.post('/', auth,  function(req, res){
    try{
      const user = req.user;
      const form = new formidable.IncomingForm();

      form.parse(req);
      form.multiples = false;

      form.uploadDir = path.join(__dirname, '/uploads');
      console.log(form.uploadDir)

      form.on('fileBegin', function(name, file){

        console.log('FileBegin .....')
        JobQueue[user] = form;

      }).on('file', function(name, file){

        console.log('File .....')

        fs.rename(file.path, path.join(__dirname, '/uploads/') + file.name, (err) => {
            if(err){
                throw err;
            }
            console.log("Uploaded Successfully");
        });
        delete JobQueue[user];
        res.status(200).send();
      }).on('abort', () => {

        console.log('abort .....')
        res.status(200).end("Aborted Successfully");
        delete JobQueue[user];

      }).on('error', (err) => {

        console.log('Error .....')
        res.status(400).end("Error! Please Check");
        throw err;
      })

    }catch(err){
      console.log(err);
      res.status(400).end('Error while uploading');
    }
})

Router.delete('/terminate', auth,  (req, res) => {
    try {
        const form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {

            const user = req.user;

            if(user in JobQueue) {
                JobQueue[user].emit("abort");
                res.status(200).end("Process terminated.");
            }
            else {
                res.status(404).end(`No running Uploads by ${user}.`);
            }
        });

    }
    catch(err) {
        res.status(400).end("Error");
    }
});

module.exports = Router;
