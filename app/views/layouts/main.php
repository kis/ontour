<?php

use yii\helpers\Html;
use yii\widgets\Menu;
use yii\widgets\Breadcrumbs;

/**
 * @var $this \yii\base\View
 * @var $content string
 */
app\config\AppAsset::register($this);
$this->beginPage();

$guest = Yii::$app->getUser()->getIsGuest();

$items = array(
    array('label' => 'VK', 'url' => array('/site/index')),
    array('label' => 'LastFM', 'url' => array('/site/lastfm')),
    array('label' => 'Artists', 'url' => array('/site/artists')),
);

if ($guest) {

} else {

}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title><?php echo Html::encode($this->title); ?></title>
    <?php $this->head(); ?>
</head>

<body>
    <div class="container">
        <?php $this->beginBody(); ?>
        <div class="masthead">
            <div class="row navbar" id="nav1">
                <?php echo Menu::widget(array(
                    'options' => array('class' => 'eight columns'),
                    'items' => $items,
                )); ?>
            </div>
        </div>

        <div class="main-container">

            <div class="row">
                <div class="centered seven columns">

                <?php echo Breadcrumbs::widget(array(
                    'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : array(),
                )); ?>

                <?php echo $content; ?>

                <hr>

                <div class="footer">
                    Kirill Styopkin, 2013
                </div>

                <?php $this->endBody(); ?>
                </div>
            </div>

        </div>

    </div>
</body>
</html>
<?php $this->endPage(); ?>
