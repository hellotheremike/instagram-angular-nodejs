/*
 * Serve JSON to our AngularJS client
 */
 var insta_api = require('instagram-node').instagram();
 var INSTAGRAM_CLIENT_ID = "6a091bef5ebf42399ad129ef64c89828"
 var INSTAGRAM_CLIENT_SECRET = "6832e514c91a40a287edabbff4f3f1be";
 var INSTAGRAM_TAG = "stockholm"
 var redirect_uri = 'http://localhost:3000/callback/';
 var mUser = null;

 exports.name = function (req, res) {
 	res.json({
 		name: 'Bob'
 	});
 };

 exports.login = function (req, res) {
	 	
	 	insta_api.use({
	 		client_id: INSTAGRAM_CLIENT_ID,
	 		client_secret: INSTAGRAM_CLIENT_SECRET
	 	});
		var http = require('https');
		//res.redirect(insta_api.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state' }));
	 		//var http = require('follow-redirects').https;
		var res_2=res;

	 	var url = insta_api.get_authorization_url(redirect_uri, { });
		// http.get(url, function(res) {
		//     var data = '';

		//     res.on('data', function(chunk) {
		//         data += chunk;
		//     });

		//     res.on('end', function() {
		//         res_2.send(data);
		//     });
		// }).on('error', function(e) {
		//       console.log("Got error: ", e);
		// });

		console.log(url);
		http.get(url, function (res) {
			var remote_data = '';
		  res.on('data', function (chunk) {
		    remote_data += chunk
		  });
		  res.on('end', function (chunk) {
		    res_2.send(remote_data);
		  });
		}).on('error', function (err) {
		  console.error(err);
		});
		
 };

 exports.get_result = function (req, res) {
 	/*
 	if(req.query.id == undefined){
		insta_api.tag_media_recent(INSTAGRAM_TAG,function(err, result, pagination, limit) {
	 		res.json( { result: result, error: err, limit:limit, pagination:pagination, user: mUser });
	 	});
	}
	else{
		insta_api.tag_media_recent(INSTAGRAM_TAG, {min_tag_id:req.query.id}, function(err, result, pagination, limit) {
 			res.json( { result: result, error: err, limit:limit, pagination:pagination, user: mUser });
 		});
	}
	*/
	insta_api.tag_media_recent(INSTAGRAM_TAG,{min_tag_id:req.query.id},function(err, result, pagination, limit) {
	 		res.json( { result: result, error: err, limit:limit, pagination:pagination, user: mUser });
	 	});
 }

 exports.callback = function (req, res) {
 	insta_api.use({
 		client_id: INSTAGRAM_CLIENT_ID,
 		client_secret: INSTAGRAM_CLIENT_SECRET
 	});
 	insta_api.authorize_user(req.query.code, redirect_uri, function(err, result) {
 		if (err) {
 			res.json({name: null});
 		} else {
 			res.json({name: result});
 		}
 	});
 }