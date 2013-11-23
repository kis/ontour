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
		  <ul class="button-group">
		    <li>
		      <button aria-selected="true" class="white museo-slab">By artist</button>
		    </li>
		    <li>
		      <button class="white museo-slab">By city</button>
		    </li>
		  </ul>
		</div>

		<div class="row gap-bottom">
			<div class="five fifth">
		    	<input id='artistField' placeholder='Enter artist name..' class='normal museo-slab'>
		    	<input id='cityField' placeholder='Enter city..' class='normal museo-slab'>
		  	</div>
		</div>

	    <div class="row">
	    	<div class="two fourths">
	      		<a id='artistButton' class="block white normal medium button"><div class="museo-slab">Search</div></a>
	      		<a id='cityButton' class="block white normal medium button"><b class="museo-slab">Search</b></a>
	    	</div>
	    </div>

	</div>
</div>

<div id='artist-info' class="row normal asphalt"></div>

	