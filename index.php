<?php
date_default_timezone_set('Asia/Ho_Chi_Minh');
require __DIR__ . '/vendor/autoload.php';
require_once 'define.php';
require_once 'function.php';
spl_autoload_register(function ($classname){
    include_once LIBRARY_PATH . $classname . '.php';
});

$bootstrap = new Bootstrap();
Session::init();
$bootstrap->init();