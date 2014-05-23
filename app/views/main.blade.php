<!DOCTYPE html>
<html lang="en">
    <head>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
        <meta charset="utf-8"/>
        <title>Ontour.im</title>

        {{ HTML::style('css/styles.css'); }}
            
        <!--[if IE]>
             {{ HTML::style('css/styles_ie.css'); }}
        <![endif]-->    

        {{ HTML::style('css/scrollbar.min.css'); }}
        {{ HTML::style('https://api.tiles.mapbox.com/mapbox.js/v1.6.2/mapbox.css'); }}

        {{ HTML::style('https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/MarkerCluster.css'); }}
        {{ HTML::style('https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/MarkerCluster.Default.css'); }}
    </head>

    <body>
        <section id="sidebar">
            <menu id="search"></menu>
            <section id="events"></section>

            <section id="controls"></section>
            <section id="status"></section>
        </section>

        <dialog id="notification"></dialog>

        <section id="settings"></section>

        <section id="map"></section>

        <script data-main="js/main.js" src="js/lib/require.js"></script>
    </body>
</html>