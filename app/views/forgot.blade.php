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
                <a href="registration" id="signup">Sign up</a>
                <a href="login" id="signin">Sign in</a>
            </header>

            <main id="success-area">
                <label>Enter your email</label>
                <form autocomplete="off" action="users/sendpwd" method="POST">
                    <input id="email" name="email" type="email" placeholder="Enter email.." autocomplete="off" value="" />
                    <button id="submit" type="submit">Send password</button>
                </form>
            </main>

            <footer>

            </footer>
        </section>
    </body>
</html>