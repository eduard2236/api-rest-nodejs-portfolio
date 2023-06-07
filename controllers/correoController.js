const {request, response} = require('express');
const nodeMailer = require('nodemailer');
require('dotenv').config({path: '../variables.env'});
const apiPass =  process.env.apiPass;
const apiUser = process.env.apiUser;

const envioCorreo = (req=request,resp=response) =>{
    let body = req.body;

    let config = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        post:587,
        auth:{
            user: apiUser,
            pass: apiPass
        }
    });
    const opciones = {
        from:'ProgramacionPortfolio',
        subject:body.asunto,
        to:'eduardcolmenares2236@gmail.com',
        html:body.html
        //name:body.name
    };

    config.sendMail(opciones,function(error,result){
        if(error) {
            return resp.json({ok:false,msg:error,
            que: opciones});
        }
        return resp.json({     
                ok:true,
                msg:result
        });
    })
}

module.exports = {
    envioCorreo
}