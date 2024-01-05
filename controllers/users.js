const { response } = require("express");
const User = require('../models/user');




const getConnectedUsers = async (req, res = response) => {

    const from = Number(req.query.from) || 0;

    const users = await User
        .find({ _id: { $ne: req.uid } })
        .sort('-online')
        .skip(from)
        .limit(20);


    res.json({
        'ok' : true,
        users,
    });


}

module.exports = {
    getConnectedUsers
}