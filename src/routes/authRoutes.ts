import { Router } from "express";
const {
    getLogin, getSignup, postLogin, postSignup
} = require('../controllers/authControllers');


const router = Router();

router.get('/signup', getSignup);
router.post('/signup', postSignup);
router.get('/login', getLogin);
router.post('/login', postLogin);


module.exports = router;