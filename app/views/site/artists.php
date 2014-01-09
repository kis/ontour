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
		      <button id="artistTab" aria-selected="true" class="white museo-slab">By artist</button>
		    </li>
		    <li>
		      <button id="cityTab" class="white museo-slab">By country/city</button>
		    </li>
		    <li>
		      <button id="venueTab" class="white museo-slab">Venues</button>
		    </li>
		  </ul>
		</div>

		<div class="row gap-bottom">
			<div class="five fifth">
		    	<input id='artistField' name='search-field' placeholder='Enter artist name..' class='normal museo-slab'>
		  	</div>
		</div>

		<div id='autocomplete' class="question box square"></div>

	    <div class="row">
	    	<div class="two fourths">
	      		<a id='artistButton' name='search-go' class="block white normal medium button"><div class="museo-slab">Search</div></a>
	    	</div>
	    </div>

	</div>
</div>

<div id='artist-info' class="row normal asphalt">
	
	<button id="animateTest" class="large asphalt animated flash">I do awesome things.</button>

</div>

	