'use strict';

import App from './App';
import AppRouter from './AppRouter';
import AppController from './AppController';

App.appRouter = new AppRouter({
    controller: new AppController()
});

App.start();
