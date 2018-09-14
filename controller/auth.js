const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = (req, res) => {
  const {email, password} = req.body;
  let userData = {
    email,
    password: bcrypt.hashSync(password, 5)
  };

  let newUser = new User(userData);
  newUser.save((error) => {
    if(!error){
      var token = jwt.sign({id: newUser._id}, process.env.secret, {
        expiresIn: 86400
      });
      return res.status(201).json({message: 'signup successful', token});
    } else {
      if (error.code ===  11000) { // this error gets thrown only if similar user record already exist.
        return res.status(409).send('user already exist!');
        } else {
          return res.status(500).send('error signing up user');
        }
    }
  });
};

exports.login = (req, res) => {
  const {email, password} = req.body;

  User.findOne({email}, (err, user) => {
    if(err) res.status(500).json({error: 'internal server error'});
    if(!user) res.status(404).json({error: 'Could not find a user with that email/password combination'});
    let passwordIsValid = bcrypt.compareSync(password, user.password);
    if(!passwordIsValid) res.status(401).json({error: 'Invalid Password'});
    var token = jwt.sign({id: user._id}, process.env.secret, {
      expiresIn: 86400
    });
    res.status(200).json({token});
  });
};

exports.verifyToken = (req,res,next) => {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    req.userId = decoded.id;
    next();
  });
};
