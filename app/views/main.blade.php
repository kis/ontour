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

        <section id="settings">
            <?php
                if (!Auth::guest()) {
                    echo '<a id="myevents">My events</a>';
                    echo HTML::link('../users/profile', 'Profile');
                    echo HTML::link('../users/logout', 'Logout');
                    echo HTML::image(Auth::user()->getPhoto());
                } else {
                    echo HTML::link('users/registration-page', 'Sign up');
                    echo HTML::link('users/login-page', 'Sign in');
                }
            ?>
        </section>

        <dialog id="notification"></dialog>
        <section id="event-detail"></section>
        <section id="map"></section>

        {{ HTML::script('../build/lib/require-min.js', array('data-main' => '../build/main.js')) }}
    </body>
</html>