<?php

use yii\helpers\Html;

require '../vendor/autoload.php';

/*
 *  LastFM API Request. Get artist events information. No need to authorize
 */

?>

<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>

<div id="search-area" class="row">
	<div id="search-box" class="box normal asphalt">
		<div class="row gap-bottom">
			<div class="four fourths">
		    	<input id='artistField' placeholder='Enter artist name..' class='normal'>
		  	</div>
		</div>
	    <div class="row">
	    	<div class="two fourths">
	      		<a id='artistButton' class="block white normal medium button">Search</a>
	    	</div>
	    </div>
	</div>
</div>

<div id='artist-info' class="row normal asphalt"></div>
	