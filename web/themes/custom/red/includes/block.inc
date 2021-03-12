<?php
/**
 * @file
 * Theme and preprocess functions for blocks.
 */

/**
 * Implements hook_preprocess_block().
 */
function red_preprocess_block(&$vars) {
  switch ($vars['plugin_id']) {
    case 'system_menu_block:main':
      // 영역을 데이터로 블록에 출력
      $block = entity_load('block', $vars['elements']['#id']);
      $region = $block->getRegion();
      $vars['content']['#attributes']['data-region'] = $region;
      break;
    case 'system_menu_block:main-right':
      $block = entity_load('block', $vars['elements']['#id']);
      $region = $block->getRegion();
      $vars['content']['#attributes']['data-region'] = $region;
      break;
    case 'views_block:customized-block_1':
      $vars['#cache']['max-age'] = 0;
      break;
  }

  // cover_block
  if (!empty($vars['bundle']) && 'cover_block' == $vars['bundle']) {
    $f_object = $vars['content']['field_cover_image'][0]['#item'];
    $f_array = method_exists($f_object, 'getValue') ? $f_object->getValue() : '';
    $fid = !empty($f_array['target_id']) ? $f_array['target_id'] : '';
    if ($fid) {
      $image = \Drupal\file\Entity\File::load($fid);
      $vars['inline_css'] = 'background: url(' . str_replace('http://', '//', $image->url()) . ') no-repeat; background-size: cover';
    }
  }

  // Custom specific block
  if ('block_content' == $vars['base_plugin_id']) {
    $current_path = \Drupal::service('path.current')->getPath();
    switch ($vars['id']) {
      // tech 서브 메뉴 블록
      case 'technavpills':
        // /tech가 포함된 노드 패스 가져오기
        $query = \Drupal::database()->select('url_alias', 'ua');
        $query->addField('ua', 'source');
        $query->condition('ua.alias', $query->escapeLike('/tech') . '%', 'LIKE');
        $results = $query->execute()->fetchCol();
        // 노드 아이디로 nav-pill 렌더 배열 반환
        if (count($results) > 1) {
          $nids = [];
          $nids = array_map(function($e){
            return str_replace("/node/", '', $e);
          }, $results);
          sort($nids, SORT_NUMERIC);
          // 노드 가져오기
          $node_storage = \Drupal::entityTypeManager()->getStorage('node');
          $nodes = $node_storage->loadMultiple($nids);
          // 링크 아이템 렌더 배열 만들기
          $items = [];
          foreach ($nodes as $key => $node) {
            // 비공개 상태인 경우 제외
            if ($node->status->value) {
              $url = Drupal\Core\Url::fromRoute('entity.node.canonical', array('node' => $key));
              $link = $node->toLink();
              if ($current_path == '/node/' . $key) {
                $link = $link->toRenderable();
                $link['#wrapper_attributes'] = ['class' => 'active'];
              }
              $items[] = $link;
            }
          }
          $vars['content'] = [
            '#theme' => 'item_list',
            '#items' => $items,
            '#type' => 'ul',
            '#attributes' => ['class' => 'nav nav-pills']
          ];
          $vars['#cache']['max-age'] = 0;
        }
        break;
    }
  }
}
