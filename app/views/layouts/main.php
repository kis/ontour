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

            <div class="navbar navbar-fixed-top">
                <div class="navbar-inner">
                    <div class="container">
                        <?php echo Menu::widget(array(
                            'options' => array('class' => 'nav'),
                            'items' => $items,
                        )); ?>
                    </div>
                </div>
            </div>
            <!-- /.navbar -->
        </div>

        <div class="main-container">

            <?php echo Breadcrumbs::widget(array(
                'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : array(),
            )); ?>

            <?php echo $content; ?>

            <hr>

            <div class="footer">
                <p>&copy; My Company <?php echo date('Y'); ?></p>
                <p>
                    <?php echo Yii::powered(); ?>
                    Template by <a href="http://twitter.github.io/bootstrap/">Twitter Bootstrap</a>
                </p>
            </div>

            <?php $this->endBody(); ?>

        </div>

    </div>
</body>
</html>
<?php $this->endPage(); ?>
