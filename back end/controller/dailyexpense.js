const Expenses = require('../model/expense');

exports.addExpenses = async (req, res, next) => {
    const {category, description, amount} = req.body;

    try{
        Expenses.create({category:category, description:description, amount:amount})
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
        Expenses.findAll()
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
        Expenses.destroy({where : {id : req.params.id}})
        .then(expense => {
            return res.status(200).json({message : 'Deleted Successfully'});
        })
        .catch(err => {
            return res.status(403).json({message : "Unable to Delete", error : err});
        })
    }catch{}
};
