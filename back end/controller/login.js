const User = require('../model/users');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

exports.userLogin = async (req, res, next) => {
    const {email, password} = req.body;
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (!existingUser) {
        return res.status(401).send({ message: 'User not found' });
      }
    
      bcrypt.compare(password, existingUser.password, function(err, result) {
        if (err) {
          // Handle error
          throw new Error('Something went wrong');
        } else if (result) {
          // Passwords match
          const token = jwt.sign({userId : existingUser.id}, 'secretKey');
          res.status(200).json({ message: 'Login successful' , token : token, user : existingUser});
        } else {
          // Passwords do not match
          return res.status(400).json({ message: 'Incorrect Password' });
        }
      });
  
      // Create new user record
      // const user = await User.create({ name, email, password });
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };