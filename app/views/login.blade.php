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
                <a href="registration" id="signup">Sign up</a>
                <a href="login" id="signin" class="active">Sign in</a>
            </div>

            <div id="login-area">
                <label>Sign In</label>
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