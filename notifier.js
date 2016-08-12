var FCM = require('fcm').FCM;
// var FCM = require('fcm-node');
// var FCM = require('fcm-push');

var apiKey = 'AIzaSyAXR8YbJi7hNRdhG9xmGqngbrIepyzjfvA';

var fcm = new FCM(apiKey);

var alertMormon = function(tokenId, title, body){

    console.log('Try Sending Notification to \nToken: ' + tokenId);

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