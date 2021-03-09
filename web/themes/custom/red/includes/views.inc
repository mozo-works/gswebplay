<?php
/**
 * @file
 * Theme and preprocess functions for views
 */

use Drupal\image\Entity\ImageStyle;

/**
 * Implements template_preprocess_views_view_grouping.
 *
 * @see templates/view/views-view-grouping--products-page-1.html.twig
 */
function red_preprocess_views_view_grouping__products__page_1(&$vars) {
  if (!empty($vars['title'])) {
    $raw_grouping_title = $vars['title'];
    $parent_values = explode('|', strip_tags($raw_grouping_title, '<a>'));
    $parent_values = array_filter($parent_values, function($val){ return str_replace(array("\r\n", "\r", "\n"), "", $val); });

    foreach ($parent_values as $key => $value) {
      switch ($key) {
        case 0:
          $style = ImageStyle::load('product_term_cover_1_crop');
          if($style) {
            $url = $style->buildUrl(trim($value));
            $vars['cover_image_url'] = str_replace('http://', '//', $url);
          } else {
            $vars['cover_image_url'] = str_replace('http://', '//', file_create_url(trim($value)));
          }
          break;
        case 1:
          $parent = $value;
          $vars['cover_title'] = strip_tags($value);
          break;
        case 2:
          $vars['cover_description'] = $value;
          break;
      }
    }

    $vars['parent_id'] = trim(str_replace(' ', '-', strtolower($vars['cover_title'])));
    $vars['hide'] = '';

    $dom = new DOMDocument;
    $dom->loadHTML($parent);
    $nodes = $dom->getElementsByTagName('a');
    if (!empty($nodes->item(0))) {
      $parent_term_id = str_replace('/taxonomy/term/', '', $nodes->item(0)->getAttribute('href'));
    }
    // /products 화면에서 customized 그룹을 표시합니다.
    if ( (int) $parent_term_id > 0 && (int) $parent_term_id != 3) {
      $vars['hide'] = " hide";
    }
    if($parent_term_id == '/ko4') $vars['hide'] = " hide";
  }
}

/**
 * Implements template_preprocess_views_view_fields.
 *
 * @see https://www.drupal.org/node/2593515
 * @see templates/view/views-view-fields--products-page-1.html.twig
 */
function red_preprocess_views_view_fields__products__page_1(&$vars) {
  $term_value = $vars['fields']['name']->content;
  $term_values = explode('|', strip_tags($term_value, '<a>'));
  $term_values = array_filter($term_values, function($val){ return str_replace(array("\r\n", "\r", "\n"), "", $val); });
  foreach ($term_values as $key => $value) {
    switch ($key) {
      case 0:
        $style = ImageStyle::load('product_term_cover_1_crop');
        if($style) {
          $url = $style->buildUrl(trim($value));
          $vars['cover_image_url'] = str_replace('http://', '//', $url);
        } else {
          $vars['cover_image_url'] = str_replace('http://', '//', file_create_url(trim($value)));
        }
        break;
      case 1:
        $vars['cover_title'] = $value;
        break;
    }
  }
  $sub_term_class = trim(str_replace(' ', '-', str_replace(' &amp; ', '-', strtolower(strip_tags($vars['cover_title'])))));
  $vars['item_class'] = ' sub-term sub-' . $sub_term_class;
  
  // standard 서브 분류 중복 제거
  // $parent = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadParents($vars['row']->tid);
  // $parent = reset($parent);
  // if($parent->ID() == 1 && $vars['row']->index % 2 == 0 ) $vars['item_class'] = ' hide';

}

/**
 * Implements template_preprocess_views_view_fields.
 *
 * @see https://www.drupal.org/node/2593515
 * @see templates/view/views-view-fields--customized-block-1.html.twig
 */
function red_preprocess_views_view_fields__customized__block_1(&$vars) {
  $term_value = $vars['fields']['name']->content;
  $parent_values = explode('|', strip_tags($term_value));
  $parent_values = array_filter($parent_values, function($val){ return str_replace(array("\r\n", "\r", "\n"), "", $val); });

  foreach ($parent_values as $key => $value) {
    switch ($key) {
      case 0:
        $style = ImageStyle::load('product_term_cover_2_crop');
        if($style) {
          $url = $style->buildUrl(trim($value));
          $vars['cover_image_url'] = str_replace('http://', '//', $url);
        } else {
          $vars['cover_image_url'] = str_replace('http://', '//', file_create_url(trim($value)));
        }
        break;
      case 1:
        $vars['cover_title'] = $parent = $value;
        break;
      case 2:
        $vars['cover_description'] = '<p>' . $value . '</p>';
        break;
    }
  }
  $vars['parent_id'] = trim(str_replace(' ', '-', strtolower($vars['cover_title'])));

  // 프로젝트일 경우 제목을 수정합니다.
  $current_uri = \Drupal::request()->getRequestUri();
  if ($current_uri == '/projects') {
    $vars['cover_title'] = 'Projects';
    // 관리자인 경우 프로젝트 추가 버튼을 보여줍니다.
    $user = \Drupal::currentUser()->getRoles();
    if(in_array("administrator", $user)) {
      $button = '<p>&nbsp;</p><a href="/node/add/project" class="btn btn-primary"><i class="fa fa-plus" aria-hidden="true"></i>&nbsp; new project</a>';
      $vars['cover_description'] .= $button;
    }
  }
}

/**
 * Implements template_preprocess_views_view_fields.
 *
 * @see templates/view/views-view-unformatted--taxonomy-term--*.html.twig
 */
function red_preprocess_views_view_unformatted__taxonomy_term(&$vars) {
  $view = $vars['view'];
  switch ($view->current_display) {
    case 'block_1':
      $vars['title'] = $view->getTitle();
      break;
    case 'page_1':
      $tid = reset($view->args);
      $parent_term = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadParents($tid);
      if ('3' == key($parent_term)) {
        $term = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->load($tid);
        $vars['title'] = $term->getName();
      }
  }
}

function red_preprocess_views_view(&$vars) {
  if($vars['id'] == 'taxonomy_term' && $vars['display_id'] == 'page_2') {
    $vars['attributes']['class'][] = 'my-5';
  }
}
