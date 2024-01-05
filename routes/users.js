/*
    path: api/users
*/

const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate_jwt');
const { getConnectedUsers } = require('../controllers/users');

const router = Router();



//Validate token
router.get('/', validateJWT , getConnectedUsers);

module.exports = router;

