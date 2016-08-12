var FCM = require('fcm').FCM;
// var FCM = require('fcm-node');
// var FCM = require('fcm-push');

var apiKey = 'AIzaSyAXR8YbJi7hNRdhG9xmGqngbrIepyzjfvA';

var fcm = new FCM(apiKey);

var id = 'eQVKFYP_fto:APA91bHXxgMUnE-03VkDmF0gronZFeJKyQm5W3yaJzs6yCISB9Iz1A1xdzqoPbpXRSnp8h6ubdYTJ57SPTmeoxEeadEwbiSuKIT46-ZGLnSsMV3NkfRs5LMRCXF1-iXvvJKW0i9dYHGV';



console.log('Try Sending Notification to \nToken: ' + id);

var alertMormon = function(tokenId, title, body){

    var message = {
        registration_id: tokenId,
        'data.title': title,
        'data.message': body
    };

    fcm.send(message, function(err, messageId){
        if (err) {
            console.log("Something has gone wrong!" + err);
        } else {
            console.log("Sent with message ID: ", messageId);
        }
        // console.log('after send');
    });
};

module.exports.alertMormon = alertMormon;