<?php
/**
 * @file
 * Theme and preprocess functions for menus
 */

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 *
 * @see http://kristiankaa.dk/article/drupal8-region-specific-menu-theme-hook-suggestion
 */
function red_theme_suggestions_menu_alter(array &$suggestions, array $vars) {
  // Remove the block and replace dashes with underscores in the block ID to
  // use for the hook name.
  if (isset($vars['attributes']['data-region'])) {
    $hook = str_replace(array('block-', '-'), array('', '_'), $vars['attributes']['data-region']);
    $suggestions[] = $vars['theme_hook_original'] . '__' . $hook;
  }
}
