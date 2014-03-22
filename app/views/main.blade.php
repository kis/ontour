<!DOCTYPE html>
<html lang="en">
    <head>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
        <meta charset="utf-8"/>
        <title>Ontour.im</title>

        {{ HTML::style('leaflet/leaflet.css'); }}
        {{ HTML::style('css/style.css'); }}

    </head>

    <body>

        <div id="search-box">
            <div id="tabs">
                <div class="tab active" id="artist-tab">By artist</div>
                <div class="tab" id="city-tab">By country/city</div>
            </div>

            <input id="artist-field" class="search-field" placeholder="Enter artist name..">                    

            <div id="autocomplete"></div>

            <a id="artist-button" class="search-button">Search</a>
        </div>

        <div id="artist-info">

            <div class="info-block"></div>

            <div id="go-top"><h3>Go to top</h3></div>
        </div>

        <div id="map-canvas"></div>

        <script data-main="frontend/app.js" src="lib/require.js"></script>

    </body>
</html>