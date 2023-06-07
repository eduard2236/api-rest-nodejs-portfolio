/* ESTO ES PARA EL USO ANTIGUO DE NODEJS UTILIZANDO CALL BACK */
/* const mongoose = require('mongoose');
const authSchema = require('../models/auth');

authSchema.statics = {
    create: async function (data, res) {
        const user = new this(data);
        try {
            await user.save();
            return res.status(200).send({ user });
        } catch (err) {
            return res.status(500).send({ message: "error al guardar el objeto", error: err });
        }
    },
    login: function ( query,cb){
        this.find(query, cb);
    }
}
const authModel = mongoose.model('Users', authSchema);
module.exports = authModel; */

