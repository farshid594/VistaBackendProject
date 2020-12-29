function LoginValidate(req, res, next) {
    if (req.body.password.length > 5) {
        next()
    } else {
        res.statue(400).json({ error: "error" })
    }
}
module.exports = LoginValidate