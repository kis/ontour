<?php

use yii\helpers\Html;

require '../vendor/autoload.php';

/*
 *  LastFM API Request. Get artist events information. No need to authorize
 */

echo Html::tag('br');
echo Html::tag('br');

echo '<div class="field">';

echo Html::input('text', 'artist', null, array(
    'placeholder' => 'Enter artist name..',
    'id' => 'artistField',
    'class' => 'input'
));

echo '</div>';

echo '<div class="xlarge primary btn">';

echo Html::a('Boom!', null, array(
    'id' => 'artistButton',
));

echo '</div>';

echo Html::tag('br');
echo Html::tag('br');

echo Html::tag('div', null, array(
    'id' => 'artist-info'
));
	