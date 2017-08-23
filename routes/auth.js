const express  = require('express'),
      router   = express.Router(),
      passport = require('passport'),
      User     = require('../models/user')

// register new user
router.get('/register', function(req, res){
  res.render('register')
})

// register new user post route
router.post('/register', function(req, res){
  var newUser = new User({username: req.body.username})
  User.register(newUser, req.body.password, function(err, user){
    if(err) {
      req.flash('error', err.message)
      return res.render('register')
    }
    passport.authenticate('local')(req, res, function(){
      req.flash('success', `Registration successful! Hello ${user.username} Welcome to YelpCamp!`)
      res.redirect('/campgrounds')
    })
  })
})

// user login
router.get('/login', function(req, res){
  res.render('login')
})

// user login post route
router.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/login'
}), function(req, res){
})

// logout user
router.get('/logout', function(req, res){
  req.logout()
  req.flash('success', 'Logged you out!')
  res.redirect('/campgrounds')
})

module.exports = router
