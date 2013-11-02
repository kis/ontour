<?php

use yii\helpers\Html;

require '../vendor/autoload.php';

/*
 *  Getting session key. Step (2)
 */

/*if(isset($_GET['token'])) {
    echo $_GET['token'];

    echo Html::tag('br');
    echo Html::tag('br');

    echo Html::a('fetch_session',
        null,
        array(
            'id' => 'fetch_session',
            'token' => $_GET['token']
        )
    );
}*/

echo Html::tag('br');
echo Html::tag('br');

/*
 *  Authorization on LastFM. Getting access token. Step 1
 */

echo Html::a('get access token',
    'http://www.last.fm/api/auth/?api_key=dd349d2176d3b97b8162bb0c0e583b1c&cb=http://yii2train/site/lastfm',
    array(
       'id' => 'lastfm_auth'
    )
);

echo Html::tag('br');
echo Html::tag('br');

/*
 *  Getting LastFM session key if pass authorization and get access token. Step 2
 */

if(isset($_GET['token'])) {
    // echo $_GET['token'];

    echo Html::a('authorize', null, array(
        'id' => 'auth',
        'token' => $_GET['token']
    ));

    echo Html::tag('br');
    echo Html::tag('br');
}

/*
 *  LastFM API Request. Get artist information. No need to authorize
 */

echo Html::a('artists', null, array(
    'id' => 'artist'
));

?>