<?php
/**
 * @file
 * Theme and preprocess functions for taxonomy terms
 */

/**
 * Implements hook_theme_suggestions_taxonomy_term_alter().
 */
function red_theme_suggestions_taxonomy_term_alter(&$suggestions, $vars, $hook) {
  $request = \Drupal::routeMatch()->getRouteObject();
  $params = \Drupal::routeMatch()->getParameters();
  $suggestions[] = 'taxonomy_term__' . $vars['elements']['#view_mode'];

  if ($params->has('taxonomy_term')) {
    $term = $params->get('taxonomy_term')->toArray();
    $id = $term['tid'][0]['value'];
    $vocabulary = $term['vid'][0]['target_id'];

    $suggestions[] = 'taxonomy_term__' . $id . '__' . $vars['elements']['#view_mode'];
    $suggestions[] = 'taxonomy_term__' . $vocabulary . '__' . $vars['elements']['#view_mode'];
  }
}

/**
 * Implements template_preprocess_taxonomy_term().
 */
function red_preprocess_taxonomy_term(&$vars) {
  $term = $vars['elements']['#taxonomy_term'];
  $vid = $term->getVocabularyId();
  if ('product' == $vid) {
    $parent_terms = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadParents($term->id());
    $parent_term = reset($parent_terms);
    if ($parent_term) {
      $vars['parent_name'] = $parent_term->getName();
      $vars['parent_class'] = ' parent-' . trim(str_replace(' ', '-', str_replace(' &amp; ', '-', strtolower(strip_tags($vars['parent_name'])))));
      switch ($vars['parent_name']) {
        case 'Standard':
          $vars['parent_url'] = '/products#standard';
          break;
        case 'New products':
          $vars['parent_url'] = '/products#new-products';
          break;
        case 'Customized':
          $vars['parent_url'] = '/products/customized';
          break;
      }
    }
    $field_cover_image_values = !empty($vars['content']['field_cover_image'][0]['#item']) ? $vars['content']['field_cover_image'][0]['#item']->getValue() : '';
    $fid = $field_cover_image_values['target_id'] ?? '';
    if ($fid) {
      $file = \Drupal::entityTypeManager()->getStorage('file')->load($fid);
      $vars['cover_image_url'] = file_create_url($file->getFileUri());
    }
    $vars['cover_description'] = $vars['content']['field_description'][0]['#context']['value'] ?? '';
  }

}
