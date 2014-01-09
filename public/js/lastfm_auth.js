$(function() {

	/*
	 *  Getting LastFM session key if pass authorization and get access token. Step 2
	 */

	$("a#auth").on({
	    click: function() {

	        var lastfm = new LastFM({
	            apiKey    : 'dd349d2176d3b97b8162bb0c0e583b1c',
	            apiSecret : '1aaac60ed1acb3d7a10d5b1caa08d116',
	        });

	        var token = $(this).attr('token');
	        var sk;

	        lastfm.auth.getSession({token: token}, {success: function(data){
	            alert("Привет, "+data.session.name+"!\n\rРад тебя видеть, твою ключ сессии "+data.session.key);
	            sk = data.session.key;
	        }, error: function(code, message){
	            if (code == 4)
	                alert("Токен умер. Щелкни снова авторизацию");
	        }});
	    }
	}); 

	/*
	 *  Getting session key. Step (2)
	 */

	/*$("a#fetch_session").on({
	    click: function() {

	        var token = $(this).attr('token');

	        alert(token);

	        var address = 'http://ws.audioscrobbler.com/2.0/auth.getSession';
	        //api signature = md5("api_keyxxxxxxxxmethodauth.getSessiontokenxxxxxxxmysecret")

	        //lastfm.auth.getSession()

	        $.ajax({
	            url: address,
	            type: "POST",
	            data: {
	                token: token,
	                api_key: 'dd349d2176d3b97b8162bb0c0e583b1c',
	                api_sig: '1aaac60ed1acb3d7a10d5b1caa08d116'
	            },
	            dataType: "jsonp",
	            error: function(data) {
	                alert('error! ' + data);
	            },
	            success: function(data) {
	               alert('success' + data);
	            }
	        });
	    }
	});*/

	
});