const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_TOKEN = process.env.JWT_TOKEN || 'drpzet';
const Todo = require('../models/Todo');

/**
 * @route POST api/auth/signup
 */
router.post('/signup', async (req, res) => {
    try {
        const userExist = await User.findOne({$or: [{email: req.body.email}]})
                                .select({_id : true});
        if(userExist) {
            return res.status(400).json({error: 'User already exist'});
        }
        const user = await new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobile: req.body.mobile,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
        })
        const token = jwt.sign({ _id: user._id }, JWT_TOKEN);
        user.token = token;
        await user.save();
        res.status(200).json({token, user});
    } catch(err) {
        res.status(400).json({error: err});
    }
});

/**
 * @route POST api/auth/login
 */
router.post('/login', async (req, res) => {
    const user = await User.findOne({$or: [{email: req.body.email}]});
    try{
        if(!user){
            return res.status(400).json({error:'User not found'});
        }
        const token = jwt.sign({ _id: user._id }, JWT_TOKEN);
        user.token = token;
        await user.save();
        
        res.json({token,user});
    }catch(err){
        res.status(400).json({error: err});
    }
});


module.exports = router;