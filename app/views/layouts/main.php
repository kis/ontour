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
    <?php $this->beginBody(); ?>
    <div id="top_menu" class="row fixed">
        <nav class="nav asphalt square">
            <div class="collapse navbar-collapse" >
                <?php echo Menu::widget(array(
                    'items' => $items,
                )); ?>
            </div>
        </nav>
    </div>

    <div id="main_area" class="row">

        <div class="one fifth" id="performers-list">
            <?php echo Breadcrumbs::widget(array(
                'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : array(),
            )); ?>

            <?php echo $content; ?>
        </div>

        <div class="four fifth" id="map-area">
            <div id="map-canvas"></div>
        </div>
    </div>

    <?php $this->endBody(); ?>

</body>
</html>
<?php $this->endPage(); ?>
