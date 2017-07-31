<?php
/**
 * @file
 * Theme and preprocess functions for fields.
 */

/**
 * Implements template_preprocess_field.
 */
function red_preprocess_field(&$vars, $hook) {
  if ('field_category' == $vars['element']['#field_name'] && 'product' == $vars['element']['#bundle']) {
    $storage = \Drupal::service('entity_type.manager')->getStorage('taxonomy_term');
    $current_term = $vars['items'][0]['content']['#options']['entity'];
    $parent_terms = $storage->loadAllParents($current_term->id());
    $parent_terms = array_reverse($parent_terms, true);
    $vars['terms_breadcrumb'] = '';
    if (count($parent_terms) > 0) {
      $terms_breadcrumb = '';
      $i = 0;
      foreach ($parent_terms as $key => $term) {
        $i++;
        $url = \Drupal\Core\Url::fromRoute('entity.taxonomy_term.canonical', ['taxonomy_term' => $term->id()]);
        $vars['terms_breadcrumb'] .= \Drupal\Core\Link::fromTextAndUrl($term->getName(), $url)->toString();
        $vars['terms_breadcrumb'] .= ($i !== count($parent_terms)) ? ' > ' : '';
      }
    }
    $vars['terms_breadcrumb'] = ['#markup' => $vars['terms_breadcrumb']];
    $vars['attributes']['class'][] = 'product__field-category';
  }
  if ($vars['element']['#bundle'] == 'article' && $vars['element']['#field_name'] == 'field_image') {
    if (empty($vars['element']['#items']->getValue())) {
      $vars['attributes']['class'][] = 'default-image';
    }
  }
}
