<?php

use yii\helpers\Html;

require '../vendor/autoload.php';

if(isset($_GET['token'])) {
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
}

echo Html::tag('br');
echo Html::tag('br');

echo Html::a('lastfm_auth',
             'http://www.last.fm/api/auth/?api_key=dd349d2176d3b97b8162bb0c0e583b1c&cb=http://yii2train/site/lastfm',
             array(
                'id' => 'lastfm_auth'
             )
);

echo Html::tag('br');
echo Html::tag('br');

echo Html::a('artists', null, array(
    'id' => 'aaa'
));

?>