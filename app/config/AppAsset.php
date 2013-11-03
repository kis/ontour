<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace app\config;

use yii\web\AssetBundle;

/**
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
class AppAsset extends AssetBundle
{
	public $basePath = '@wwwroot';
	public $baseUrl = '@www';
	public $css = array(
        'gumby/css/gumby.css',
        'gumby/css/style.css',

		'css/site.css'
	);
	public $js = array(
		'gumby/js/libs/jquery-1.10.1.min.js',
        'gumby/js/libs/jquery-1.10.1.min.map',
        'gumby/js/libs/jquery-2.0.2.min.js',
        'gumby/js/libs/jquery-2.0.2.min.map',
        //'gumby/js/main.js',
        //'gumby/js/plugins.js',
        //'gumby/js/libs/gumby.init.js',
        'gumby/js/libs/modernizr-2.6.2.min.js',
        'gumby/js/libs/gumby.min.js',

        'js/lib/jquery-2.0.3.min.js',
        'js/lib/jquery-2.0.3.min.map',
        'js/lib/lastfm.api.js',
        'js/lib/lastfm.api.cache.js',
        'js/lib/md5-min.js',
        'js/vk.js',
        'js/lastfm.js'
	);
	public $depends = array(
		//'yii\web\YiiAsset',
		//'yii\bootstrap\ResponsiveAsset',
	);
}