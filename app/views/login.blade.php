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

                <?php
                    echo Form::label('form', 'Sign In');
                ?>
                    <div class="error">{{ $errors->first('result') }}</div>
                <?php
                    echo Form::open(array('action' => 'UserController@postLogin'));
                    echo Form::email('email', '', array('placeholder' => 'Enter email..'));
                    echo Form::password('password', array('placeholder' => 'Enter password..'));
                    echo Form::submit('Sign in', array('id' => 'submit'));
                ?>
                    <button id="forgot" type="submit" formaction="forgot">Forgot password?</button>
                <?php
                    echo Form::close();
                ?>

            </main>

            <footer>

            </footer>
        </section>
    </body>
</html>