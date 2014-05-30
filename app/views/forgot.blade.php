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
                <a href="login-page" id="signin">Sign in</a>
            </header>

            <main id="forgot-area">

                <?php
                    echo Form::label('form', 'Enter your email');
                    echo Form::open(array('action' => 'UserController@postSendResetLink'));
                    echo Form::email('email', '', array('placeholder' => 'Enter email..'));
                ?>

                    <div class="error">{{ $errors->first('email') }}</div>

                <?php
                    echo Form::submit('Send reset link', array('id' => 'submit'));
                    echo Form::close();
                ?>

            </main>

            <footer>

            </footer>
        </section>
    </body>
</html>