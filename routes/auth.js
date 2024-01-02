/*
    path: api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { addUser, login, renewToken } = require('../controllers/authController');
const { validateFields } = require('../middlewares/validar_campos');
const { validateJWT } = require('../middlewares/validate_jwt');

const router = Router();


//Rutas

router.post('/new', [
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('email','El email es obligatorio o es incorrecto.').isEmail(),
    validateFields
] ,addUser);

router.post('/', [
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('email','El email es obligatorio o es incorrecto.').isEmail(),
], login );

//Validate token
router.get('/renew', validateJWT , renewToken);





module.exports = router;

