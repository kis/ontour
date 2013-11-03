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
     *  LastFM API Request. Get artist information. No need to authorize
     */

    $("#artistButton").on({
        click: function() {

            var artistName = $('input#artistField').val();

            if(!artistName) {
                $('input#artistField').parent().addClass('danger');
            } else {
                $('input#artistField').parent().removeClass('danger');

                var lastfm = new LastFM({
                    apiKey    : 'dd349d2176d3b97b8162bb0c0e583b1c',
                    apiSecret : '1aaac60ed1acb3d7a10d5b1caa08d116'
                });

                lastfm.artist.getEvents({artist: artistName}, {success: function(data){
                    var events = data.events.event;

                    $('#artist-info').children().detach();

                    if(data.events.event == undefined) {
                        $('#artist-info').append('<h4>Такого артиста не существует </h4><br/><br/>');
                        return;
                    }

                    if(events.length != undefined) {
                        $('#artist-info').append('<h4>Найдено ' +events.length+ ' предстоящих событий </h4><br/><br/>');

                        events.forEach(function(value, index) {
                            $('#artist-info').append(
                                '<div class="event">' +
                                value.id + '<br/>' +
                                value.venue.name + '<br/>' +
                                value.venue.location.city + '<br/>' +
                                value.venue.location.country + '<br/>' +
                                value.venue.location['geo:point']['geo:lat'] + '<br/>' +
                                value.venue.location['geo:point']['geo:long'] + '<br/>' +
                                value.startDate + '<br/>' + //value.startTime +
                                    '</div><br/><br/>');
                            //$('#artist-info').append(data.events.event[0].id + '<br/>');
                        });
                    } else {
                        $('#artist-info').append(
                            '<h4>Найдено 1 предстоящее событие </h4><br/><br/><div class="event">' +
                            data.events.event.id + '<br/>' +
                            data.events.event.venue.name + '<br/>' +
                            data.events.event.venue.location.city + '<br/>' +
                            data.events.event.venue.location.country + '<br/>' +
                            data.events.event.venue.location['geo:point']['geo:lat'] + '<br/>' +
                            data.events.event.venue.location['geo:point']['geo:long'] + '<br/>' +
                            data.events.event.startDate + '<br/>' + //value.startTime +
                                '</div><br/><br/>');    
                    }

                }, error: function(code, message){
                    if (code == 4)
                        alert('error!');
                }});
            }
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
