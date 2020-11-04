const express = require("express");
const Cat = require("./lib/Cat");
const hackNSA = require("./lib/MrRobot");
const app = express();
const port = 3000;
const haskNSA = require("./lib/MrRobot");

const jwt = require("jsonwebtoken");

const config = {
    secretKey:
        "qaRiqjgNVBlaEapLnZJlG0sLFNbm7Ams94UNhSgXIxTDkRz26FkpmrrvHCUDwqyZVOhrljTaKg6RfLjSPHK3bdTE3ccg8VdvwTI8VrzbItg",
};

app.use(express.json());

const authorizationMiddleware = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401).send({
            status: "ok",
        });
    } else {
        const jwtToken = authorization.replace("Bearer ", "");
        jwt.verify(jwtToken, config.secretKey, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    status: "not ok",
                });
            } else {
                next();
            }
        });
    }
};

app.post("/graphql", authorizationMiddleware, (req, res) => {
    res.send({
        status: "ok",
    });
});

app.post("/graphql/public", (req, res) => {
    const { user, pass } = req.body;

    if (user === "Rares" && pass === "abcdefg") {
        jwt.sign({}, config.secretKey, (err, token) => {
            res.send({
                token,
            });
        });
    } else {
        res.status(401).send({
            status: "not ok",
        });
    }
});

app.listen(port, function () {
    return console.log("Example app listening on port " + port);
});
