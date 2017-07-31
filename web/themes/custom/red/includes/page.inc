<?php
/**
 * @file
 * Theme and preprocess functions for pages.
 */

/**
 * Implements hook_theme_suggestions_page_alter().
 */
function red_theme_suggestions_page_alter(array &$suggestions, array $vars) {
  // Add content type suggestions.
  if ($node = \Drupal::request()->attributes->get('node')) {
    array_splice($suggestions, 1, 0, 'page__node__' . $node->getType());
    // Add path alias based suggestions.
    $current_path = \Drupal::service('path.current')->getPath();
    $result = \Drupal::service('path.alias_manager')->getAliasByPath($current_path);

    $path_alias = trim($result, '/');
    $path_alias = str_replace('/', '-', $path_alias);

    $suggestions[] = 'page__alias__'.$path_alias;
  }
}

/**
 * Implements hook_preprocess_page().
 * 페이지 레이아웃 형식 분기 - Full width | Blank
 */
function red_preprocess_page(&$vars) {
  // 현재 언어 링크 숨기기
  $language = \Drupal::languageManager()->getCurrentLanguage()->getId();
  $vars['active_' . $language] = ' class="hide"';

  // 콘텐츠 영역 전체 너비 여부
  $vars['full_width'] = false;
  // 상하단 헤더 푸터 제외 여부
  $vars['blank'] = false;

  // 초기 화면 전체 너비로
  if ($vars['is_front']) {
    $vars['full_width'] = true;
  }

  $current_route = \Drupal::routeMatch()->getRouteName();
  $full_width_routes = [
    'view.products.page_1',
    'entity.taxonomy_term.canonical',
  ];
  if (in_array($current_route, $full_width_routes)) {
    $vars['full_width'] = true;
    if ($vars['full_width']) {
      if (!empty($vars['page']['content']['pagetitle'])) {
        $vars['page']['content']['pagetitle']['#attributes']['class'][] = 'container';
      }
    }
  }
}

/**
 * Preprocess variables for html templates.
 * 바디 클래스 추가 및 파인더 base 메타 태그 출력
 */
function red_preprocess_html(&$vars) {
  $current_path = \Drupal::service('path.current')->getPath();
  $result = \Drupal::service('path.alias_manager')->getAliasByPath($current_path);

  $path_alias = trim($result, '/');
  $path_class = 'path--' . str_replace('/', '-', $path_alias);

  if (isset($path_class)) {
    $vars['attributes']['class'][] = $path_class;
  }
  if ('/node/18' == $current_path) {
    $vars['page']['#attached']['html_head'][] = [
      [ '#tag' => 'base', '#attributes' => [ 'href' => '/finder'] ], 'base'
    ];
  }
}
