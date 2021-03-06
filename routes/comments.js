const express     = require('express'),
      router      = express.Router({mergeParams: true}),
      Campground  = require('../models/campground'),
      Comment     = require('../models/comment'),
      middleware  = require('../middleware')

// if logged in create new comment
router.get('/new', middleware.isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err) {
      console.log(`ERROR! ${err}`)
    }
    else {
      res.render('comments/new', {campground: campground})
    }
  })
})

// new comment post route
router.post('/', middleware.isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err) {
      console.log(`ERROR! ${err}`)
      res.redirect('/camgrounds')
    }
    else {
      Comment.create(req.body.comment, function(err, comment){
        if(err) {
          res.flash('error', "Oops! Something went wrong.")
          console.log(err)
        }
        else {
          // add username and id to comment
          comment.author.id = req.user._id
          comment.author.username = req.user.username
          // save comment
          comment.save()
          campground.comments.push(comment)
          campground.save()
          req.flash('success', "Comment added!")
          res.redirect(`/campgrounds/${campground._id}`)
        }
      })
    }
  })
})

// Comment edit route
router.get('/:comment_id/edit', middleware.doesUserOwnComment, function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err) {
      res.redirect('back')
    }
    else {
      res.render('comments/edit', {campground_id: req.params.id, comment: foundComment})
    }
  })
})

// Comment update route
router.put('/:comment_id', middleware.doesUserOwnComment, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err) {
      res.redirect('back')
    }
    else {
      res.redirect(`/campgrounds/${req.params.id}`)
    }
  })
})

// Delete comment route
router.delete('/:comment_id', middleware.doesUserOwnComment, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err) {
      res.redirect('back')
    }
    else {
      req.flash('success', "Comment deleted!")
      res.redirect(`/campgrounds/${req.params.id}`)
    }
  })
})

module.exports = router
