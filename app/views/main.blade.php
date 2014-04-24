<!DOCTYPE html>
<html lang="en">
    <head>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
        <meta charset="utf-8"/>
        <title>Ontour.im</title>

        {{ HTML::style('css/style.css'); }}
        {{ HTML::style('https://api.tiles.mapbox.com/mapbox.js/v1.6.2/mapbox.css'); }}

    </head>

    <body>

        <section id="sidebar">
            <section id="search"></section>
            <section id="status"></section>
            <section id="events"></section>
        </section>

        <div id="controls-top">
            <a id="slide"><b><</b></a>
        </div>

        <div id="controls-bottom">
            <a id="go-top"><b>^</b></a>
        </div>

        <div id="map"></div>

        <script data-main="js/main.js" src="js/lib/require.js"></script>

    </body>
</html>