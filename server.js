//get all the modules
var express = require('express');
var app = express();
var port = process.env.PORT || 3000; 

var bodyParser = require('body-parser');

var fbase = require('./firebase-server');

var server = require('http').createServer(app);

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//set our port
// ROUTES FOR OUR API
var router = express.Router();              // get an instance of the express Router

router.get('/sample', function(req, res) {
    res.send('this is a sample!');  
});


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});



// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.send('Welcome to our api!');   
});

router.post('/', function (req, res) {
  res.send('POST request to the homepage');
});

//post request 
router.route('/notify-post')
    // show the form (GET http://localhost:8080/login)
    .get(function(req, res) {
        res.json({message: "get works"});
    })
    // process the form (POST http://localhost:8080/login)
    .post(function(req, res) {

        // res.json({message: "plaease work u peice of fucking shit"});
        // var jsonObj = JSON.parse(req.body);

         //res.json({message: req.body.location.latitude})
        // //res.send(req.body.latitude);
        // var lat = req.body.location.getChild(latitude).val();
        // //var lng = req.body.longitude;

         console.log(req.body.latitude);
         res.json({latitude: req.body.latitude});
        //pass in location parmeters.
        // fbase.notifyPosts(function(results){
        // 	console.log(results);

        // 	if(results != null){
        // 		res.json({message: "Firebase snapshot is not null!"});
        // 	}
        // 	else{
        // 		res.json({message: "notify post unsuccessful"});
        // 	}
        // })
    });

app.use('/app', router);

server.listen(port,function(){
	console.log('Server listening at port %d', port);
});