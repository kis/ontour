<!DOCTYPE html>
<html lang="en">
    <head>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
        <meta charset="utf-8"/>
        <title>Ontour.im</title>
        {{ HTML::style('css/styles.css'); }}
    </head>

    <body>
        <section id="area">
            <header id="homepage">
                <a href="registration-page" id="signup" class="active">Sign up</a>
                <a href="login-page" id="signin">Sign in</a>
            </header>

            <main id="registration-area">
                <label>Sign Up</label>
                <form action="register" method="POST" autocomplete="off">
                    <input id="email" name="email" type="email" placeholder="Enter email.." autocomplete="off" value="" />
                    <input id="password" name="password" type="password" placeholder="Enter password.." autocomplete="off" />
                    <input id="password_confirmation" name="password_confirmation" type="password" placeholder="Repeat password.." autocomplete="off" />
                    <button id="submit" type="submit">Sign up</button>
                </form>
            </main>

            <footer>

            </footer>
        </section>
    </body>
</html>