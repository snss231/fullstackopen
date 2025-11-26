module.exports = (err, req, res, next) => {
    if (err.name === "ValidationError") {
        res.status(400).json(err)
    }
    else if (err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key error')) {
        return res.status(400).json({ error: 'expected `username` to be unique' })
    }
    next()
}