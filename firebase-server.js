//make refrence to firebase up here
// var Firebase = require("firebase");

// // Firebase.initializeApp({
// //   apiKey: '<RQnj2Lk0OSPvMoHJeeydbYSjJWYoV4vBp5WBzf9l>',
// //   authDomain: '<1:389597629270:android:e0a3b652f0d42fb5.firebaseapp.com>',
// //   databaseURL: '<https://MormonAlert.firebaseio.com>',
// //   storageBucket: '<gs://mormonalert.appspot.com>'
// // });

// Firebase.initializeApp({
//   serviceAccount: {
//     projectId: "1:389597629270:android:e0a3b652f0d42fb5",
//     clientEmail: "foo@1:389597629270:android:e0a3b652f0d42fb5.iam.gserviceaccount.com",
//     privateKey: "-----BEGIN PRIVATE KEY-----\nRQnj2Lk0OSPvMoHJeeydbYSjJWYoV4vBp5WBzf9l\n-----END PRIVATE KEY-----\n"
//   },
//   databaseURL: "https://MormonAlert.firebaseio.com"
// });
// //create a connection to the account
// var FirebaseRef = new Firebase("https://MormonAlert.firebaseio.com/");

var firebase = require("firebase");

// Initialize the app with no authentication
firebase.initializeApp({
	  serviceAccount: {
 	    projectId: "1:389597629270:android:e0a3b652f0d42fb5",
  	    clientEmail: "foo@1:389597629270:android:e0a3b652f0d42fb5.iam.gserviceaccount.com",
  	    privateKey: "-----BEGIN PRIVATE KEY-----\nRQnj2Lk0OSPvMoHJeeydbYSjJWYoV4vBp5WBzf9l\n-----END PRIVATE KEY-----\n"
    },

  databaseURL: "https://MormonAlert.firebaseio.com"
});

// The app only has access to public data as defined in the Security Rules
var db = firebase.database();
var ref = db.ref('mormonalert');


var notifyPosts = function(callback){

    //take a snapshot in JSON of your Firebase and store it in an object
	// FirebaseRef.on("value", function(snapshot) {
 	//  		FirebaseContent = snapshot.val();
	// }, function(errorObject) {
 	//  		console.log("The read failed: " + errorObject.code);
	// }); 
	//FirebaseContent is a JavaScript object containing the complete Firebase data.

	//check the firebase data base and extract latitudes and logitudes of mormons in speficied range. 
	ref.once("value", function(snapshot) {
		firebaseContent = snapshot.val();
		var what = firebaseContent.child("postal_codes").child("98258").child("mormons").child("KONXK_CXnQWAW_2PhbA").child("description").val();
	//callback(null);
		

  		console.log(what);
	});

	//post request for notifications
	//alert user of nearby added mormons

};

module.exports.notifyPosts = notifyPosts;