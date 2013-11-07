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
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8"/>
    <title><?php echo Html::encode($this->title); ?></title>
    <?php $this->head(); ?>
</head>

<body>
    <div class="container">
        
        <?php $this->beginBody(); ?>
        
        <div class="row navbar" id="nav1" gumby-fixed="top">
            <?php echo Menu::widget(array(
                'options' => array('class' => 'six columns'),
                'items' => $items,
            )); ?>
        </div>

        <div class="main-container">
            <div class="row">
                <div class="two columns" id="performers-list">
                    <?php echo Breadcrumbs::widget(array(
                        'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : array(),
                    )); ?>

                    <?php echo $content; ?>

                </div>

                <div class="ten columns" id="map-area">
                    <div id="map-canvas"></div>
                </div>
            </div>

            <!-- <div class="footer">
                Kirill Styopkin, 2013
            </div> -->

            <?php $this->endBody(); ?>
        </div>

    </div>
</body>
</html>
<?php $this->endPage(); ?>
