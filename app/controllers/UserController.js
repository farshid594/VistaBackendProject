const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.LogOut = (req, res) => {
    req.user.tokens = req.user.tokens.filter((t) => {
        return t != req.token
    })
    req.user.save((err) => {
        if (err) {
            res.status(500).json({ error: "خطای سرور" })
            return
        }
        res.status(200).json({ message: "خروج موفقیت آمیز" })
    })
}
exports.LogOutAll = (req, res) => {
    req.user.tokens = []
    req.user.save((err) => {
        if (err) {
            res.status(500).json({ error: "خطای سرور" })
            return
        }
        res.status(200).json({ message: "خروج موفقیت آمیز" })
    })
}
exports.GetUser = (req, res) => {
    res.status(200).json({ name: req.user.name })
}
exports.Upload = (req, res) => {
    req.files.image.mv('./public/profiles/' + req.files.image.name, (err) => {
        if (err) {
            res.status(500).json({ error: err })
            return
        }
        req.user.image = '/profiles/' + req.files.image.name
        req.user.save((err) => {
            if (err) {
                res.status(500).json({ error: err })
                return
            }
            res.status(200).json({ path: '/profiles/' + req.files.image.name })
            return
        })
    })
}
exports.Login = (req, res) => {
    User.findOne({ mobile: req.body.mobile }, (err, result) => {
        if (err) {
            res.status(500).json({ error: "خطای سرور" })
            return
        }
        if (!result) {
            res.status(401).json({ error: "کاربری با این مشخصات وجود ندارد" })
            return
        }
        bcrypt.compare(req.body.password, result.password, (err, same) => {
            if (err) {
                res.status(500).json({ error: "خطای سرور" })
                return
            }
            if (!same) {
                res.status(401).json({ error: "کاربری با این مشخصات وجود ندارد" })
                return
            }
            let token = jwt.sign({ userId: result._id }, process.env.JWT_SECRET_KEY, { expiresIn: '100m' })
            result.tokens = [...result.tokens, token]
            result.save((err) => {
                if (err) {
                    res.status(500).json({ error: "خطای سرور" })
                    return
                }
                res.json({ token: token })
                return
            })
        })
    })
}
exports.Register = (req, res) => {
    const newUser = new User({
        name: req.body.name,
        mobile: req.body.mobile,
        password: req.body.password
    })
    newUser.save((err, result) => {
        if (err) {
            res.status(500).json({ error: "خطای سرور" })
            return
        }
        res.status(201).json({ user: result })
        return
    })
}



