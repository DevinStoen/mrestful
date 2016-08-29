var firebase = require("firebase");
var notifier = require('./notifier');

// Initialize the app with a service account, granting admin privileges
firebase.initializeApp({
  	databaseURL: "https://mormonalert.firebaseio.com",
  	serviceAccount: {
	  "type": "service_account",
	  "project_id": "mormonalert",
	  "private_key_id": "f98a3ed71e86baa01c575ba113eb79fca429adf7",
	  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC2jVwEqCzJoB3L\nv5FkIWWsfggRFwuDdVfLv0ztOxj41uPWMfYBE0bQlbt8/3wGAvgas27z5jChbiuP\nWtZozqCgPlEDowMyLqTyOQuMUhHcoiTKpaesTlv9a4LAlWS7WeBykrM2Ns48TE/1\nfjKn3/U272itwZpfB26qzTiDIH6F23dogXfr2hDWeeSu28xRfD1m7mmQUH6+I9ps\nIuxY1ATS30sjJEh3XOq1YjV5M1Vv0OUUuvyEAe5lbHdeyyMxe+nA6rxJCX9/f2QZ\neyNn56GstJHCmF3z+rqcavY8LvMiJRUInjD6QhJigBSmFsjBcHgNRqDkVnNhU/se\nQs729Fc7AgMBAAECggEASd76FYhYV17Lr99dXj+FfT+i1AeXSSL63CAVaQo5GLkc\niVi+S8EZLt7od7SK44PgEi36AAhuNWT3i5MeoFq89RtCfU5BxNTLOpmK6sVrJPUY\nHkjaiQdMgkg3KOdLU+USxkpG6vFSk2PuF1Fx/izKdeh7W5S0ey/uwH87FxTXHiL5\n9AM5O5IYNNJ0oUTdW91Gds0uCNbsn1jQmB1bJ7TSjTKXq++Da2FTOU/Q/x9OYfaU\nah0b3u5+96F/c2vSrkvpIl0cNMRxknO6rFzLw3na+rlPR6yyLQk0HxECKHbYz4cT\nVRgx1j/nzEpQbNmIvAfz21pu4x99bmdSftwKlUk4AQKBgQDlQ7TRlq3b2w+GHVEM\nqabHqdiwnSlpu+BdkqMmBvQPKySfLLQqe9oDXqpS8C+b6uuiaORqqN3zu5PWwjXG\ncHqp26yztJ06MnVBL/w+zJ8VBGDG4S34BvR8zhwZJtiFDxHSmVIerzgcdNFVs9yy\nadQdIxf9ZxpnQMbhuzoNJC65uwKBgQDL1yN6GDXS1wRXbYpz9+P0qB8sps6HoIWX\ntv/b5NVva0ovfZbQHKwT8v3ny/cpQEWnDoREg9qPB786tGoOvIoY6eSLOdUA4/Z4\nyP07QAbYmjsjcqMQMJA7GbUFJhXvXUoPvC3PRu3epK9RcxiYVcAwQTsgneqR5pYz\n+D8cAk5AgQKBgCq8DCBlLdMlaiddn5X0qZneFv4UzXtgAdpvUunrseKB8DmbY5nn\nrCOkqar8CmPNzk5frvQStgyQkmYdnVh37uVqhS6aJBSNAz47a5FpIt4QCtoHb0Ik\nSb5ZzPMDQqjKvk+7NItzrcngHIUVGbZH87naqMYbSdilQm0hMRjx/aOxAoGBAIgn\nYLQJ/dGh+21mZqeFeccOkRwjIyqmhvVKr+YyGHp+wKOuEJFbxXjhwsUUkTgFjUDD\nyod1RwRomUvd/EVxnBB+EkEI1QTuP9B39+Weo7QEeOH5jX+f4IcJacdRpC8pMfIG\nsNaVuwcPG2edKF2AUYop2BO2R1tDGSsHcygDRj+BAoGBAIkzAACUPi0s/Ci/AKFQ\nkZ8r9NAVKMsUUEt/d0L3/JmP2TYHQOBdCZhB8PLjcXMGGbmkAutnCHwHCOuDqAyp\n2GQ72cS1Hbi8gZedJzJXh+OFc5/cYhrMaFMovqfDVMbtBjQdOjaNjy8wL4AC94L0\nQSwtFsL5jvQAcv0bN12v8k2k\n-----END PRIVATE KEY-----\n",
	  "client_email": "mormon-server@mormonalert.iam.gserviceaccount.com",
	  "client_id": "116880053995809998275",
	  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
	  "token_uri": "https://accounts.google.com/o/oauth2/token",
	  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
	  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/mormon-server%40mormonalert.iam.gserviceaccount.com"
	}
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = firebase.database();
var ref = db.ref("mormons");

// Retrieve new posts as they are added to our database
ref.on("child_added", function(snapshot, prevChildKey) {
	var mormon = snapshot.val();
	// console.log(mormon);
	console.log("Mormon Loop");

	//getting postal code and mormonId
	var zip = mormon.zip;
	// var lat = mormon.latLng.latitude;
	// var lng = mormon.latLng.longitude;
	// console.log("zip: " + zip);
	// console.log("lat:" + lat);
	// console.log("lng:" + lng);

	var mormonId = snapshot.key;
	// console.log("mormonId: " + mormonId);

	// removing the pin after certain time frame
	var mormonIdRef = db.ref("postal_codes").child(zip).child("mormon_ids");
	var mormonRef = ref.child(mormonId);
	// var obj = {};
	// obj[mormonId] = false;
	setTimeout(function(){
		console.log("after 10 sec, remove the mormonId");
		mormonIdRef.child(mormonId).set(null);
		mormonRef.set(null);
	}, 10 * 1000);

	// TODO: send push notification to all the same zipcode device
	var userIdRef = db.ref("postal_codes").child(zip).child("user_ids");
	userIdRef.on("child_added", function(snapshot, prevChildKey) {

		console.log("UserId Loop");

		var userId = snapshot.key;
		// console.log("userId: " + userId);

		var userRef = db.ref("users").child(userId);
		userRef.on("value", function(snapshot) {

			var user = snapshot.val();
			var token = user.token;
			// console.log("token: " + token);

			notifier.alertMormon(token, "Mormon Alert!!", "There are mormons close by", mormonId);
			userRef.off();

		}, function (errorObject) {
			console.log("The read failed: " + errorObject.code);
		});

	}, function (errorObject) {
		console.log("The read failed: " + errorObject.code);
	});
});


	  

