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
                <a href="registration-page" id="signup">Sign up</a>
                <a href="login-page" id="signin" class="active">Sign in</a>
            </header>

            <main id="login-area">
                <label>Sign In</label>
                <form action="login" method="POST">
                    <input id="email" name="email" type="text" placeholder="Enter email.." />
                    <input id="password" name="password" type="password" placeholder="Enter password.." />
                    <button id="submit" type="submit">Sign in</button>
                    <button id="forgot" type="submit" formaction="forgot">Forgot password?</button>
                </form>
            </main>

            <footer>

            </footer>
        </section>
    </body>
</html>