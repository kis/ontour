<?php

use yii\helpers\Html;

require '../vendor/autoload.php';

if(isset($_GET['code'])) {
    echo Html::a('get access token', null, array(
        'id' => 'token',
        'code' => $_GET['code']
    ));
}

echo Html::tag('br');
echo Html::tag('br');

echo Html::a('profile', null, array(
    'id' => 'show_profile'
));

echo Html::tag('br');
echo Html::tag('br');

echo Html::a('auth', null, array(
    'id' => 'oauth'
));

echo Html::script(null, array(
    'src' => "http://vk.com/js/api/openapi.js",
    'type' => "text/javascript"
));

echo Html::tag('br');
echo Html::tag('br');

echo Html::a('auth', null, array(
    'id' => 'login_button',
    'onclick' => 'VK.Auth.login();'
));

echo Html::tag('br');

echo Html::a('audio', null, array(
    'id' => 'audio'
));

echo Html::tag('br');
echo Html::tag('br');

echo Html::tag('div', '', array(
    'id' => 'vk_api_transport'
));

echo Html::tag('div', '', array(
    'id' => 'response'
));

/*$faker = Faker\Factory::create();

for($i=0; $i<3; ++$i)  {
    echo $faker->name."<br/>";

    echo $faker->address."<br/>";

    echo $faker->text."<br/><br/>";
}*/

?>