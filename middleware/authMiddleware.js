const config= require("../config");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).send({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send({ message: "Unauthorized" });
    }
};

module.exports =  authenticate ;