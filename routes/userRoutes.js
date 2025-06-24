const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/', async(req, res) => {
    const users = await User.query().withGraphFetched('tasks')
    res.render('users', { users })
})
router.post('/add', async(req, res) => {
    const { name, email, mobile } = req.body;
    const emailRegex = /\S+@\S+\.\S+/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(email) || !mobileRegex.test(mobile)) {
        return res.send('Invalid Email or Mobile')
    }

    await User.query().insert({ name, email, mobile });
    res.redirect('/users')
})
module.exports = router;