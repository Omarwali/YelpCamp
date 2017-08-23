const express    = require('express'),
      router     = express.Router(),
      Campground = require('../models/campground'),
      middleware = require('../middleware')

// Show all campgrounds
router.get('/', function(req, res){
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err)
    }
    else {
      res.render('campgrounds/index', {campgrounds: allCampgrounds})
    }
  })
})

// New campground post route
router.post('/', middleware.isLoggedIn, function(req, res){
  var name          = req.body.name,
      price         = req.body.price,
      image         = req.body.image,
      desc          = req.body.description,
      author        = {id: req.user._id, username: req.user.username},
      newCampground = {name: name, price: price, image: image, description: desc, author: author}

  Campground.create(newCampground, function(err, newCamp){
    if (err) {
      console.log(err)
    }
    else {
      console.log(`${newCamp} created successfully`)
      res.redirect('/campgrounds')
    }
  })
})

// Create new campground
router.get('/new', middleware.isLoggedIn, function(req, res){
  res.render('campgrounds/new')
})

// Show specific campground
router.get('/:id', function(req, res){
  Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
    if(err){
      console.log(err)
    }
    else {
      console.log(foundCampground)
      res.render('campgrounds/show', {campground: foundCampground})
    }
  })
})

// Edit campground route
router.get('/:id/edit', middleware.doesUserOwnCampground, function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
    res.render('campgrounds/edit', {campground: foundCampground})
  })
})

// Update campground route
router.put('/:id', middleware.doesUserOwnCampground, function(req, res){
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if(err) {
      res.redirect('/campgrounds')
    } else {
      res.redirect(`/campgrounds/${req.params.id}`)
    }
  })
})

// Delete campground route
router.delete('/:id', middleware.doesUserOwnCampground, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err) {
      res.redirect('/campgrounds')
    } else {
      res.redirect('/campgrounds')
    }
  })
})

module.exports = router
