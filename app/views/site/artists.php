<?php

use yii\helpers\Html;

require '../vendor/autoload.php';

echo Html::tag('br');
echo Html::tag('br');

echo Html::input('string', 'artist', null, array(
    'placeholder' => 'Enter artist name..',
    'id' => 'artistField'
));

echo Html::tag('br');
echo Html::tag('br');

echo Html::button('Boom!', array(
    'id' => 'artistButton'
));

echo Html::tag('br');
echo Html::tag('br');

echo Html::tag('div', null, array(
    'id' => 'artist-info'
));