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
            <div id="homepage">
                <a id="signup" class="active">Sign up</a>
                <a id="signin">Sign in</a>                                                            
            </div>

            <div id="registration-area">
                <form action="users/register" method="POST">
                    <input id="email" name="email" type="email" placeholder="Enter email..">
                    <input id="password" name="password" type="password" placeholder="Enter password..">
                    <button type="submit">Sign up</button>
                </form>
            </div>

            <div id="login-area">
                <form action="users/login" method="POST">
                    <input id="login" name="login" type="text" placeholder="Enter login..">
                    <input id="password" name="password" type="password" placeholder="Enter password..">
                    <button type="submit">Sign in</button>
                </form>
            </div>
        </div>

        <script src="js/lib/jquery.min.js"></script>
        <script src="js/lib/underscore-min.js"></script>        
        <script src="js/lib/backbone.js"></script>
        <script src="js/lib/backbone.marionette.min.js"></script>
        <script src="js/home.js"></script>
    </body>
</html>