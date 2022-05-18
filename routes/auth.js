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
        const userExist = await User.findOne({$or: [{email: req.body.email}, {username: req.body.username}]})
                                .select({_id : true});
        if(userExist) {
            return res.status(400).json({error: 'User already exist'});
        }
        const user = await new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
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
    const user = await User.findOne({$or: [{email: req.body.email}, {username: req.body.username}]});
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

router.get('/todo', async(req, res) => {
    try {
        const todo = await Todo.find();
        res.json(todo);
    } catch (error) {
        res.json({error});
    }
});

router.post('/todo',async(req,res) => {
    try {
        const todo = await new Todo({
            username: req.body.username,
            todo: req.body.todo
        });
        console.log(todo);
        await todo.save();
        res.status(200).json({todo});
    } catch (error) {
        res.status(401).json({error});
    }
})



module.exports = router;