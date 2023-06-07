//const User = require('../dao/auth.dao');
var Auth = require('../models/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';


exports.createUser = async function (req, res) {
    var user = new Auth();
    var params = req.body;

    user.name = params.name;
    user.email = params.email;
    user.password = bcrypt.hashSync(params.password);

    try {
        await user.save();
        //return res.status(200).send({ proyect });
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id },
            SECRET_KEY, {
            expiresIn: expiresIn
        });
        //response
        const dataUser = {
            name: user.name,
            email: user.email,
            accessToken: accessToken,
            expiresIn: expiresIn
        }
        return res.send({ dataUser });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).send({ message: "El email ya existe", error: err });
        } else {
            return res.status(500).send({ message: "error al guardar el objeto", error: err });
        }

    }
}

/* ASI SE HACE CON NODEJS ANTIGUO UTILIZANDO CALL BACK */

/* exports.createUser = (req, res, next) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    User.create(newUser, (err, user) => {
        if (err) return res.status(500).send('error en el servidor');
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id },
            SECRET_KEY, {
            expiresIn: expiresIn
        });
        //response
        res.send({ user });

    })
} */

exports.loginUser = async function (req, res) {
    var params = req.body;
    let users;
    const userData = {
        email: params.email,
        password: params.password
    }

    if (userData.email == null) return res.status(404).send({ message: 'el usuario no existe' });
    try {
        users = await Auth.findOne({ email: userData.email });
        if (!users) {
            res.status(409).send({ message: 'el email no existe' });
        } else {
            const resultPassword = bcrypt.compareSync(userData.password, users.password);
            if (resultPassword) {
                const expiresIn = 24 * 60 * 60;
                const accessToken = jwt.sign({ id: users.id }, SECRET_KEY, { expiresIn: expiresIn });
                const dataUser = {
                    name: users.name,
                    email: users.email,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }
                res.send({ dataUser })
            } else {
                //password not exist
                res.status(409).send({ message: 'algo esta mal' });
            }

        }
    } catch (err) {
        return res.status(500).send({ message: "error al buscar", error: err });
    }
}

/* ASI SE HACE CON NODEJS ANTIGUO UTILIZANDO CALL BACK */
        //return res.status(200).send({ proyect });
/* const expiresIn = 24 * 60 * 60;
const accessToken = jwt.sign({ id: user.id },
    SECRET_KEY, {
    expiresIn: expiresIn
}); */
        //response
/* return res.send({ user });
} catch (err) {
return res.status(500).send({ message: "error al guardar el objeto", error: err });
} */

/* exports.loginUser = (req, res, next) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    }
    User.findOne({ email: userData.email }, (err, user) => {
        if (err) return res.status(500).send('error en el servidor');
        if (!user) {
            //email no exist
            res.status(409).send({ message: 'algo esta mal' });
        } else {
            const resultPassword = userData.password;
            if (resultPassword) {
                const expiresIn = 24 * 60 * 60;
                const accesToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });
                res.send({ userData });
            } else {
                //password not exist
                res.status(409).send({ message: 'algo esta mal' });
            }
        }
    })
} */