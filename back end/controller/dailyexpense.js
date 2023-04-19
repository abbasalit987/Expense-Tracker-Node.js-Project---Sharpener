const Expenses = require('../model/expense');

const jwt = require('jsonwebtoken');

exports.addExpenses = async (req, res, next) => {
    const {category, description, amount} = req.body;
    const token  = req.header('Authorization');
    const userId = jwt.verify(token, 'secretKey').userId;

    try{
        Expenses.create({category:category, description:description, amount:amount, userId : userId})
        .then(expense => {
            return res.status(201).json({expense, success : true});
        })
        .catch(err => {
            return res.status(403).json({success : false, error : err});
        })
    }catch{}
};

exports.getExpenses = async (req, res, next) => {

    try{
        Expenses.findAll({where : {userId : req.user.id}})
        .then(expense => {
            return res.status(200).json({expense, success : true});
        })
        .catch(err => {
            return res.status(402).json({success : false, error : err});
        })
    }catch{}
};

exports.deleteExpenses = async (req, res, next) => {
    const {category, description, amount} = req.body;

    try{
        Expenses.destroy({where : {id : req.params.id, userId : req.user.id}})
        .then(noOfRowsDeleted => {
            if(noOfRowsDeleted === 0) {
                return res.status(404).json({message : "Expense doesn't belongs to the user"});
            }
            return res.status(200).json({message : 'Deleted Successfully'});
        })
        .catch(err => {
            return res.status(403).json({message : "Unable to Delete", error : err});
        })
    }catch{}
};
