<!DOCTYPE html>
<html lang="en">
    <head>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
        <meta charset="utf-8"/>
        <title>Ontour.im</title>

        {{ HTML::style('css/styles.css'); }}
        {{ HTML::style('css/scrollbar.min.css'); }}
        {{ HTML::style('https://api.tiles.mapbox.com/mapbox.js/v1.6.2/mapbox.css'); }}

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