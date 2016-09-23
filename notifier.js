var FCM = require('fcm').FCM;
// var FCM = require('fcm-node');
// var FCM = require('fcm-push');

var apiKey = 'AIzaSyA8QLgTbYj8ZTLk1ujQ-Q54eWZGYnDTX-c';

var fcm = new FCM(apiKey);

var alertMormon = function(tokenId, title, body, mormonId){

    // console.log('Try Sending Notification to \nToken: ' + tokenId);

    var message = {
        registration_id: tokenId,
        'data.title': title,
        'data.message': body,
        'data.mormonId': mormonId
        // 'data.lat': lat,
        // 'data.lng': lng
    };

    fcm.send(message, function(err, messageId){
        if (err) {
            console.log("Something has gone wrong!" + err);
        } else {
            console.log("Sent with message ID: ", messageId);
            console.log("Send to token: ", tokenId)
        }
        // console.log('after send');
    });
};

module.exports.alertMormon = alertMormon;