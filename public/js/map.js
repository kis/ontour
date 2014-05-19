define(['models/Map',
		'views/MapView'
], function(Map, MapView) {

	var mapView = new MapView({model: new Map()});
	return mapView;

});