<?php
/**
 * @file
 * Theme and preprocess functions for paragraphs.
 */

/**
 * Implements template_preprocess_paragraph().
 */
function red_preprocess_paragraph(&$vars) {
  $p = $vars['paragraph'];
  if ('partner' == $p->bundle()) {
    $icons = ['#markup' => ''];

    $images = $vars['content']['field_image']['#items']->getIterator();
    foreach ($images as $key => $image) {
      $data = $image->getValue();
      $fid = $data['target_id'];
      if ($fid) {
        $icon = \Drupal\file\Entity\File::load($fid);
        $icons['#markup'] .= '<img src="' . $icon->url() . '" />';
      }
    }

    $title = $vars['content']['field_title']['0']['#context']['value'];
    $icons['#markup'] .= ' ' . $title;
    $url = !empty($vars['content']['field_link']['0']) ? $vars['content']['field_link']['0']['#url']->toUriString() : '';

    if ($url) {
      $vars['link'] = [
        '#type' => 'link',
        '#title' => $icons,
        '#url' => \Drupal\Core\Url::fromUri($url),
        '#attributes' => ['target' => '_blank']
      ];
    } else {
      $vars['link'] = $icons;
    }
  }
}
