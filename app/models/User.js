const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchame = new Schema({
    name: { type: String },
    password: { type: String },
    mobile: { type: String },
    tokens: { type: [String], default: [] },
    image: { type: String, default: "" }
}, {
    timestamps: true
})
UserSchame.pre('save', function (next) {
    bcrypt.hash(this.password, bcrypt.genSaltSync(10), (err, hash) => {
        if (err) {
            next(err)
            return
        }
        this.password = hash
        next()
    })
})

const User = mongoose.model('User', UserSchame)
module.exports = User

