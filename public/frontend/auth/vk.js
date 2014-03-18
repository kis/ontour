$(function() {

    /*
     *   List of users
     */
    var address = 'https://api.vk.com/method/users.get?callback=?';

    var users = [];

    for(var i=1; i<200; i++) {
        users[i] = i;
    }

    $("a#show_profile").on({
        click: function() {

            $.ajax({
                url: address,
                type: "POST",
                data: {
                    user_ids: users,
                    v: '5.2',
                    fields: 'photo_100'
                },
                dataType: "json",
                error: function(data) {
                    alert('error! ' + data);
                },
                success: function(data) {
                    var container = $('div#response');

                    data.response.forEach(function(entry) {
                        var aa = entry;

                        //container.append(aa.id + ' ');
                        //container.append(aa.first_name + ' ');
                        //container.append(aa.last_name);
                        container.append('<div id="user_pic"><img class="user_image"" src=' + aa.photo_100 + ' /></div>');
                    });

                }
            });
        }
    });

    /*
     *   OAuth Authorization
     */
    var address_auth = "https://oauth.vk.com/authorize?client_id=3903848&scope=audio&redirect_uri=http://yii2train&response_type=code&v=5.2";

    $("a#oauth").on({
        click: function() {
            window.location.replace(address_auth);
        }
    });

    /*
     *   Getting Access Token
     */
    var code = $("a#token").attr('code');
    var address_token = "https://oauth.vk.com/access_token?client_id=3903848&client_secret=1YfLqa5l6lYn1y3UbvIf&code="+ code +"&redirect_uri=http://yii2train";

    $("a#token").on({
        click: function() {
            window.location.replace(address_token);

            //window.location.replace('http://yii2train');
            //window.open(address_token);
            //alert(address_token);

            /*$.ajax({
                url: address_token,
                type: "GET",
                dataType: "json",
                error: function(data) {
                    alert('error! ' + data);
                },
                success: function(data) {
                    var container = $('div#response');
                    alert(data.response);
                }
            });*/
        }
    });

    /*
     *   List of audio
     */
    var address_audio = 'https://api.vk.com/method/audio.get?callback=?';

    $("a#audio").on({
        click: function() {

            $.ajax({
                url: address_audio,
                type: "POST",
                data: {
                    owner_id: 9408031,
                    v: '5.2',
                    count: 1,
                    access_token: "b81fef472c6cf9e50f741ee01e0cd57dfbd5ee54962a2fe403e5fdafc61087e2f68a42cbe57f50242a41e"
                },
                dataType: "json",
                error: function(data) {
                    alert('error! ' + data);
                },
                success: function(data) {
                    var container = $('div#response');

                    data.response.forEach(function(entry) { //problem
                        var aa = entry;
                        alert(aa);
                        //container.append(aa.id + ' ');
                        //container.append(aa.first_name + ' ');
                        //container.append(aa.last_name);
                        //container.append('<div id="user_pic"><img class="user_image"" src=' + aa.photo_100 + ' /></div>');
                    });
                }
            });
        }
    });

    /*
     *   Open Api
     */
    /*VK.init({
        apiId: 3903848
    });

    function authInfo(response) {
        if (response.session) {
            alert('user: '+response.session.mid);
        } else {
            alert('not auth');
        }
    }

    VK.Auth.getLoginStatus(function(response) {
        if (response.session) {
            window.location = baseURL + '?op=main&page=auth';
        } else {
            VK.UI.button('vk_login');
        }
    });

    VK.UI.button('login_button');*/

});





