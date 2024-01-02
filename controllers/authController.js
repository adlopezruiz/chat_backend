const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const addUser = async (req,res = response) => {
    
    const { email,password } = req.body;
    

    try {
        
        const emailExists = await User.findOne({email});

        if (emailExists) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }


        const user = new User(req.body);

        //Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password,salt);

        await user.save();

        //Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con un admin'
        });
    }



}

//User login
const login = async (req, res) => {

    const { email,password } = req.body;

    try {

        const dbUser =  await User.findOne({email});

        if (!dbUser) {
            return res.status(404).json({
                ok: false,
                msg : 'Email no encontrado'
            });
        }

        //Validate password
        const validPassword = bcrypt.compareSync(password, dbUser.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg : 'Invalid Password'
            });
        }

        //Generate JWT
        const token = await generateJWT(dbUser.id);

        res.json({
            ok: true,
            dbUser,
            token
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con admin'
        });    
    }

}

//Renew JWT token
const renewToken = async (req, res = response) => {

    // GET UID
    const uid = req.uid;

    // Generate new JWT
    const newToken = await generateJWT(uid);

    // Get user by uid, User mongoose, findById
    const user = await User.findById(uid);

    res.json({
        ok: true,
        msg: user,
        newToken
    });
}

module.exports = {
    addUser,
    login,
    renewToken
}