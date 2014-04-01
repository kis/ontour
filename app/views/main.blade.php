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

        <div id="sidebar">

            <div id="search-box">
                <div id="tabs">
                    <a class="tab active" id="artist-tab">By artist</a>
                    <a class="tab" id="city-tab">By country/city</a>
                </div>

                <input id="artist-field" class="search-field" placeholder="Enter artist name..">                 

                <div id="autocomplete"></div>

                <a id="artist-button" class="search-button">Search</a>
            </div>

            <div id="artist-info">

                <div class="info-block"></div>

            </div>

        </div>

        <div id="map-canvas"></div>

        <script data-main="frontend/app.js" src="lib/require.js"></script>

    </body>
</html>