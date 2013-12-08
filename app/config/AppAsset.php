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
        'groundwork/css/groundwork-core.css',
        'groundwork/css/groundwork-type.css',
        'groundwork/css/groundwork-ui.css',
        'groundwork/css/groundwork-anim.css',
        'groundwork/css/groundwork-ie.css',
        'css/site.css'
	);
	public $js = array(
        'groundwork/js/libs/jquery-1.10.2.min.js',
        'groundwork/js/groundwork.all.js',
        'groundwork/js/libs/modernizr-2.6.2.min.js',

        'js/lib/jquery-2.0.3.min.js',
        'js/lib/jquery-2.0.3.min.map',
        'js/lib/lastfm.api.js',
        'js/lib/lastfm.api.cache.js',
        'js/lib/md5-min.js',
        'js/vk.js',
        'js/lastfm.js',
        'js/lastfm_auth.js',
        'js/map.js'
	);
	public $depends = array(
		//'yii\web\YiiAsset',
		//'yii\bootstrap\ResponsiveAsset',
	);
}