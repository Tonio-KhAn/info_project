const router = require('express').Router();
const bcrypt = require('bcryptjs');
let User = require('../models/user.model');
const path = require('path');
const JWT = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

router.route('/user').get(auth, (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});



router.route("/add").post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    
    if (!username || !email || !password){
        return res.status(400).json({msg: ' Enter all Fields' });
    }
    User.findOne({username})
    .then(user => {
        if(user) return res.status(400).json(
            {msg: 'User with same username already exist'}
        );
    const newUser = new User({username, email, password});
    bcrypt.genSalt(10,(err,salt) =>{
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            
            newUser.password= hash;
    newUser
      .save()
      .then(user => {

        JWT.sign(
            {id:user.id
            },
            config.get('jwtSecret'),
            { expiresIn:3600},
            (err, token) =>{
                if(err) throw err;

                res.json({token,
                user:{
                    id: user.id,
                    username: user.username
                }
            })
                .catch(err => res.status(400).json("Error: " + err));
            }
        )

        });
        })
    })
  });
});

router.route("/login").post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    if (!username || !password){
        return res.status(400).json({msg: ' Enter all Fields' });
    }
    User.findOne({username})
    .then(user => {
        if(!user) return res.status(400).json(
            {msg: 'User with same username does not exist'}
        );
    bcrypt.compare(password, user.password)
            .then(isMatch =>{
                if(!isMatch) return res.status(400).json({msg: ' Wrong PassWord' });
                JWT.sign(
                    {id:user.id
                    },
                    config.get('jwtSecret'),
                    { expiresIn:3600},
                    (err, token) =>{
                        if(err) throw err;
                        res.json({token,
                            user:{
                                id: user.id,
                                username: user.username
                            }
                        })
                        .catch(err => res.status(400).json("Error: " + err));
                    }
                )
            })
  });


});


module.exports = router;