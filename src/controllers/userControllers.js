const {validationResult} = require('express-validator');

const modelUser = require('../model/User');
const bcrypt = require('bcryptjs');

const userControlers = {
    login: (_req,res)=>{res.render('login')},
    
    register: (req,res)=>{res.render('register')},

    postLogin:(req,res)=>{
        const {
            email,
            password
        }=req.body;

        const errors = validationResult(req);
        if(errors.isEmpty()){
            const userLogin = modelUser.findByField('email',email);
            if(userLogin){
                const passwd = bcrypt.compareSync(password,userLogin.password);
                if(passwd){
                    req.session.userLogged = userLogin;
                    return res.send('Bienvenido ' + userLogin.email);
                }else{
                    return res.send('Contraseña incorrecta');
                }
            }
            res.send('Error! no se encuentra el email')
        }else{
            res.render('login',{
                'errors':errors.array(),
                'prev': req.body
            })
        }
        
    },

    postRegister:(req,res)=>{
        const {
            name,
            surname,
            email,
            password
        }=req.body;

        const errors = validationResult(req);

        if(errors.isEmpty()){
            const userExist = modelUser.findByField('email',email)
            if(userExist){
                res.send('El usuario ya se encuentra registrado');
            }else{
                const obj = {
                    ...req.body,
                    password: bcrypt.hashSync(password, 10)
                }
                modelUser.create(obj);
                res.send('Good Job!');
            }
        }else{
            res.render('register',{
                'errors':errors.array(),
                'prev': req.body
            })
        }
    },

    // logout: (req,res) => {
    //     req.session.destroy();
    //     req.redirect('/login');
    // }
}

module.exports = userControlers;