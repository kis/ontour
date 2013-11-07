<?php

use yii\helpers\Html;

require '../vendor/autoload.php';

/*
 *  LastFM API Request. Get artist events information. No need to authorize
 */

?>

<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>

<br/>
<br/>

<div class="field">

	<input type='text' id='artistField' placeholder='Enter artist name..' class='input'>

</div>

<div class="large btn default">

	<a id='artistButton'>Boom!</a>

</div>

<br/>
<br/>

<div id='artist-info'></div>
	