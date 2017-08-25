const mongoose = require('mongoose'),
Campground     = require('./models/campground'),
Comment        = require('./models/comment')

var seedData = [
  {
    name: "Izatal",
    image: "https://farm2.staticflickr.com/1179/1051152631_f8b4ae0a33.jpg",
    description: "Intuitive physical computing venture capital bootstrapping grok hacker disrupt engaging entrepreneur minimum viable product affordances hacker. Bootstrapping pair programming unicorn human-centered design pitch deck long shadow sticky note piverate. Human-centered design Steve Jobs sticky note prototype latte parallax big data entrepreneur quantitative vs. qualitative thought leader viral food-truck prototype. Venture capital 360 campaign integrate fund cortado co-working affordances minimum viable product."
  },
  {
    name: "Merls",
    image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
    description: "Big data sticky note hacker integrate paradigm user centered design ideate earned media earned media fund affordances engaging. Grok user story quantitative vs. qualitative ship it ideate physical computing actionable insight viral earned media affordances. Workflow actionable insight latte ideate pair programming big data human-centered design long shadow ship it viral minimum viable product. Latte cortado pair programming user story disrupt entrepreneur ship it parallax venture capital."
  },
  {
    name: "Abogaine",
    image: "https://vignette2.wikia.nocookie.net/anno2205/images/8/82/Space_Station.png/revision/latest?cb=20151110142655",
    description: "Physical computing iterate pitch deck innovate prototype user centered design actionable insight. Sticky note unicorn parallax minimum viable product responsive parallax piverate actionable insight. Integrate intuitive human-centered design viral bootstrapping ideate prototype fund human-centered design. Iterate engaging minimum viable product ideate sticky note bootstrapping entrepreneur actionable insight workflow pivot 360 campaign thinker-maker-doer disrupt."
  }
]

function seedDB() {
  //Remove all campgrounds
  Campground.remove({}, function(err){
    if (err) {
      console.log(err)
    }
    console.log('removed campgrounds!')
    // //Add a few campgrounds
    // seedData.forEach(function(seed){
    //   Campground.create(seed, function(err, campground){
    //     if (err) {
    //       console.log(err)
    //     }
    //     else {
    //       console.log(`seedGround added successfully!`)
    //       //Create a comment for each campground
    //       Comment.create(
    //         {
    //           text: "This place is great but I wish there was internet",
    //           author: "TARS"
    //         }, function(err, comment) {
    //           if (err) {
    //             console.log(`ERROR => ${err}`)
    //           }
    //           else {
    //             campground.comments.push(comment)
    //             campground.save()
    //             console.log(`Created new comment!`)
    //           }
    //       })
    //     }
    //   })
    // })
  })
}
module.exports = seedDB
