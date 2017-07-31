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

function red_preprocess_menu(&$vars) {
  if (!empty($vars['attributes']['data-region']) && $vars['attributes']['data-region'] == 'navbar_secondary') {
    if (in_array($vars['menu_name'], ['main', 'main-right'])) {
      $groups = [];
      foreach ($vars['items'] as $key => $item) {
        $parent = $vars['items'][$key]['original_link']->getParent();
        $groups[$parent][$key] = $item;
      }
      krsort($groups, SORT_STRING);
      $vars['groups'] = $groups;
    }
  }

}
