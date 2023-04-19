const jwt = require('jsonwebtoken');
const User = require('../model/users');
const { use } = require('../route/dailyexpense');

// Middleware to verify JWT
exports.verifyToken = async (req, res, next) => {
    // Get the token from request headers, query, or body
    try{
        const token = req.header('Authorization');
  
        // Check if token exists
        if (!token) {
          return res.status(403).json({ error: 'Token not provided' });
        }
      
        // Verify and decode the JWT token
        const user = jwt.verify(token, 'secretKey');
        User.findByPk(user.userId).then(user => {
            console.log(JSON.stringify(user));
            req.user = user;
            next();
        }).catch(err => {throw new Error(err)})

    }catch(err){
        return res.status(401).json({success : false});
    }
  };
  