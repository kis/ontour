$(function() {

    /*var lastfm = new LastFM({
        apiKey    : 'dd349d2176d3b97b8162bb0c0e583b1c',
        apiSecret : '1aaac60ed1acb3d7a10d5b1caa08d116'
        //cache     : cache
    });*/

    $("a#fetch_session").on({
        click: function() {

            var token = $(this).attr('token');

            var address = 'http://www.last.fm/auth.getSession';
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
    });
});
