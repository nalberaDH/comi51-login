const {validationResult} = require('express-validator');



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
            res.send(req.body);
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
            res.send(req.body);
    
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