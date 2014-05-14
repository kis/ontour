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
        <a href="logout" id="signup">Logout</a>
    </header>

    <main id="profile-area">
        <label>Profile</label>
        <form action="login" method="POST">
            <!--foto-->
            <input id="login" name="login" type="text" value="" placeholder="Enter login.." />
            <input id="email" name="email" type="text" value="" placeholder="Enter email.." />
            <input id="password" name="password" type="password" value="" placeholder="Enter password.." />
            <input id="first_name" name="first_name" type="text" value="" placeholder="Enter first name.." />
            <input id="last_name" name="last_name" type="text" value="" placeholder="Enter last name.." />
            <input id="sex" name="sex" type="radio" value="" />Male
            <input id="sex" name="sex" type="radio" value="" />Female
            <input id="location" name="location" type="text" value="" placeholder="Enter location.." />
            <input id="phone" name="phone" type="text" value="" placeholder="Enter phone.." />
            <button id="submit" type="submit">Edit profile</button>
        </form>
    </main>

    <footer>

    </footer>
</section>
</body>
</html>