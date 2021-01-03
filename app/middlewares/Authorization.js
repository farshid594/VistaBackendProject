const jwt = require('jsonwebtoken')
const User = require('../models/User')

function Authorization(req, res, next) {
    const token = req.headers.authorization
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
        if (err) {
            res.status(401).json({ error: "خطای سرور" })
            return
        }
        User.findById(data.userId, (err, result) => {
            if (err) {
                res.status(401).json({ error: "خطای سرور" })
                return
            }

            if (!result) {
                res.status(401).json({ error: "خطای سرور" })
                return
            }

            if (result.tokens.includes(token)) {
                req.user = result
                req.token = token
                next()
                return
            } else {
                res.status(401).json({ error: "توکن نا معتبر" })
            }
        })
    })
}
module.exports = Authorization