<?php namespace app\controllers;

use Yii;
use yii\web\Controller;

class SiteController extends Controller
{
    public function actionIndex() {
        return $this->render('artists'); //index
    }

    public function actionLastfm() {
        return $this->render('lastfm');
    }

    public function actionArtists() {
        return $this->render('artists');
    }

}
