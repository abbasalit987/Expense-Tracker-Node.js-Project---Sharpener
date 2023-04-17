const User = require('../model/users');

exports.userLogin = async (req, res, next) => {
    const {email, password} = req.body;
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (!existingUser) {
        return res.status(401).send({ message: 'User not found' });
      }
    
      if (password !== existingUser.password) {
        return res.status(401).send({ message: 'User not authorized' });
      }
  
      // Create new user record
      // const user = await User.create({ name, email, password });
      res.send({ message: 'Login successful' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };