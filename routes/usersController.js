 var bcrypt = require('bcrypt');
 var jwtUtils = require('../utils/jwt.utils');
 var models = require('../models');

 //Routes
 module.exports = {
     register: (req, res) => {

         // Params
         var email = req.body.email;
         var username = req.body.username;
         var password = req.body.password;
         var bio = req.body.bio;


         // check params 
         if (email == null || username == null || password == null) {
             return res.status(400).json({ 'error': 'missing parameters' });
         }

         // verify pseudo le,gth, mail regex, password ect.
         models.User.findOne({
                 attributes: ['email'],
                 where: { email: email }
             })
             .then((userFound) => {
                 if (!userFound) {
                     bcrypt.hash(password, 5, (err, bcryptedPassword) => {
                         var newUser = models.User.create({
                                 email: email,
                                 username: username,
                                 password: bcryptedPassword,
                                 bio: bio,
                                 isAdmin: 0
                             })
                             .then((newUser) => {
                                 return res.status(201).json({
                                     'userId': newUser.id
                                 });
                             })
                             .catch((err) => {
                                 return res.status(500).json({ 'error': 'cannot add user' });
                             });
                     });
                 } else {
                     return res.status(409).json({ 'error': 'usr already exist' });
                 }
             })
             .catch((err) => {
                 return res.status(500).json({ 'error': 'unable to verify user' })
             });
     },
     login: (req, res) => {
         // Params
         var email = req.body.email;
         var password = req.body.password;

         // check params 
         if (email == null || password == null) {
             return res.status(400).json({ 'error': 'missing parameters' });
         }

         // verify mail regex & password length
         models.User.findOne({
                 where: { email: email }
             })
             .then((userFound) => {
                 if (userFound) {
                     bcrypt.compare(password, userFound.password, (errBycrypt, resBycrypt) => {
                         if (resBycrypt) {
                             return res.status(200).json({
                                 'userId': userFound.id,
                                 'token': jwtUtils.generateTokenForUser(userFound)
                             });
                         } else {
                             return res.status(403).json({ "errotr": "invalid password" });
                         }
                     })
                 }
             })
             .catch((err) => {
                 return res.status(500).json({ 'error': 'unable to verify user' })
             });
     }
 }