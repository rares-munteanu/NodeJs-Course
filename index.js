const express = require("express");
const Cat = require("./lib/Cat");
const hackNSA = require("./lib/MrRobot");
const app = express();
const port = 3000;
const haskNSA = require("./lib/MrRobot");

const jwt = require("jsonwebtoken");

const config = {
    secretKey: "SuperSecretKey",
};

app.use(express.json());

app.get("/cat-fact", function (req, res) {
    const cat = new Cat();
    cat.getFact().then(body => {
        const { text } = body;
        res.send(text);
    });
});

app.get("/hackNSA", async function (req, res) {
    const cat = new Cat();
    const { text } = await cat.getFact();
    const { password } = await hackNSA();

    res.send({
        password,
        text,
    });

    // const factRequest =  cat.getFact();
    // const hack =  hackNSA();
    // const allData = Promise.all([hack, factRequest]);
    // allData.then(([{ password }, { text }]) => {
    //     res.send({
    //         password,
    //         text,
    //     });
    // });

    // hack.then(({ password }) => {
    //     res.send(password);
    // }).catch(() => {
    //     res.send("Eroare");
    // });
});

const authorizationMiddleware = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401).sned({
            status: "ok",
        });
    } else {
        const jwtToken = authorization.replace("Bearer ", "");
        jwt.verify(jwtToken, config.secretKey, (err, decoded) => {
            if (err) {
                res.status(401).sned({
                    status: "ok",
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
