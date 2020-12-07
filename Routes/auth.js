const jwt = require('jsonwebtoken');
const Router = require('express').Router();
const User = require('../models/user')
const auth = require('../Middleware/auth')

const SecretKey = "Harsh Vishnoi";

Router.get("/check", function(req, res){
  res.send("Auth router is working fine")
})

Router.post("/signup", async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(req)
    }
})

Router.post("/signin", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        console.log(user)
        const token = user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = Router;
