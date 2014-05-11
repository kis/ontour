<!DOCTYPE html>
<html lang="en">
    <head>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
        <meta charset="utf-8"/>
        <title>Ontour.im</title>

        {{ HTML::style('css/styles.css'); }}

    </head>

    <body>
        <div id="area">
            <div id="registration">
                <form action="register" method="POST">
                    <input id="email" name="email" type="email" placeholder="Enter email..">
                    <input id="password" name="password" type="password" placeholder="Enter password..">
                    <button id="register" type="submit">Register</div>                    
                </form>
            </div>
        </div>
    </body>
</html>