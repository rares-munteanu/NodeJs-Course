const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
const User = require('./models/user');
const models = require('./models/index');

const config = {
    secretKey:
        'qaRiqjgNVBlaEapLnZJlG0sLFNbm7Ams94UNhSgXIxTDkRz26FkpmrrvHCUDwqyZVOhrljTaKg6RfLjSPHK3bdTE3ccg8VdvwTI8VrzbItg',
};

app.use(express.json());

const authorizationMiddleware = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401).send({
            status: 'ok',
        });
    } else {
        const jwtToken = authorization.replace('Bearer ', '');
        jwt.verify(jwtToken, config.secretKey, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    status: 'not ok',
                });
            } else {
                next();
            }
        });
    }
};

app.post('/login', (req, res) => {
    const { user, pass } = req.body;
    if (user === 'Gogu' && pass === 'P@rOlA') {
        jwt.sign({}, config.JWTSECRET, (err, token) => {
            if (!err) {
                res.send({
                    token,
                });
            }
        });
    } else {
        res.send({ error: true }, 401);
    }
});

app.post('/graphql', authorizationMiddleware, (req, res) => {
    res.send({
        status: 'ok',
    });
});

app.post('/graphql/public', (req, res) => {
    const { user, pass } = req.body;

    if (user === 'Rares' && pass === 'abcdefg') {
        jwt.sign({}, config.secretKey, (err, token) => {
            res.send({
                token,
            });
        });
    } else {
        res.status(401).send({
            status: 'not ok',
        });
    }
});

app.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    const user = await models.User.findByPk(userId);

    res.send({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    });
});

app.get('/users/:userId/profile', async function (req, res) {
    const userId = req.params.userId;
    const user = await models.User.findByPk(userId);
    const profile = await user.getProfile();

    res.send({
        email: user.email,
        profile,
    });
});

app.get('/users/:userId/getProducts', async function (req, res) {
    const userId = req.params.userId;
    const user = await models.User.findByPk(userId);
    const products = await user.getProducts();

    res.send({
        email: user.email,
        products,
    });
});

app.listen(port, function () {});
