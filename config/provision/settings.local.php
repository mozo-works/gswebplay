<?php

$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/development.services.yml';
$config['system.logging']['error_level'] = 'verbose';

$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;

$settings['cache']['bins']['render'] = 'cache.backend.null';
$settings['cache']['bins']['discovery_migration'] = 'cache.backend.memory';
$settings['cache']['bins']['page'] = 'cache.backend.null';
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';

$settings["config_sync_directory"] = '../config/sync';
$settings['config_exclude_modules'] = ['devel', 'stage_file_proxy', 'kint'];

$databases['default']['default'] = [
  'database' => 'gswebplay',
  'username' => 'root',
  'password' => '',
  'host' => '127.0.0.1',
  'port' => '3306',
  'driver' => 'mysql',
  'prefix' => '',
  'collation' => 'utf8mb4_general_ci',
];

$conf['stage_file_proxy_origin'] = 'http://gswebplay.com';
