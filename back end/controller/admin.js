const User = require('../model/users');

exports.userSignUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Create new user record
    const user = await User.create({ name, email, password });
    return res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

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

// exports.getUsers = async (req, res, next) => {
//     try{
//         const users = await User.findAll();
//         res.status(201).json({allUsers : users});
//       } catch(err) {
//         res.status(500).json({
//           error : err
//         })
//     }
// }

// exports.deleteUser = async (req, res, next) => {
//     try{
//         await User.destroy({where : {id : req.params.id}});
//         res.send('DELETE request called');
//         } catch(err){
//         res.status(500).json({
//           error : err
//         })
//     }
// }