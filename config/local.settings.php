<?php

/**
 * @file
 * This file is for local settings overrides that should be present in all
 * environments. It is loaded before DB, ENV and Flysystem settings.
 */

if (!defined('PROJECT_ROOT')) {
  define('PROJECT_ROOT', dirname(DRUPAL_ROOT));
}

$config_directories['sync'] = '../config/sync';
$settings['hash_salt'] = '';

// Load .env file if it exists
if (file_exists(PROJECT_ROOT . '/.env')) {
  // Load environment
  $dotenv = new Dotenv\Dotenv(PROJECT_ROOT);
  $dotenv->load();

  // Require DATABASE_URL to be defined
  $dotenv->required('DRUPAL_HASH_SALT')->notEmpty();
}

if (!empty($hash_salt)) {
  $settings['hash_salt'] = getenv('DRUPAL_HASH_SALT');
}

$settings['trusted_host_patterns'] = array(
  '^localhost$',
  '^127.0.0.1$',
  '^gsweb.mozo.kr$'
);

$config['config_split.config_split.config_dev']['status'] = FALSE;
if(getenv('DRUPAL_ENV') == 'development') {
  $config['config_split.config_split.config_dev']['status'] = TRUE;
}

$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/development.services.yml';

$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;

$settings['cache']['bins']['render'] = 'cache.backend.null';
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';
$settings['cache']['bins']['page'] = 'cache.backend.null';
$settings['extension_discovery_scan_tests'] = FALSE;
