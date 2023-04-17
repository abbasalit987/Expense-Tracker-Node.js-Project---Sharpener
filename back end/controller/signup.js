const User = require('../model/users');

const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.userSignUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    try {
      // Hash the user's password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Save the user to the database
      const user = await User.create({
        name,
        email,
        password: hashedPassword, // save the hashed password
      });
  
      return res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
   } catch (error) {
     console.error(error);
     return res.status(500).json({ message: 'Internal server error' });
   }
};