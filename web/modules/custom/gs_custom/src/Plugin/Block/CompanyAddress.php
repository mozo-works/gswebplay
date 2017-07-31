<?php

namespace Drupal\gs_custom\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Provides a 'CompanyAddress' block.
 *
 * @Block(
 *  id = "company_address",
 *  admin_label = @Translation("Company address"),
 * )
 */
class CompanyAddress extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [
         'company_name' => $this->t(''),
         'company_address' => $this->t(''),
         'company_phone' => $this->t(''),
         'company_fax' => $this->t(''),
        ] + parent::defaultConfiguration();
  }

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    $form['company_name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Company name'),
      '#description' => $this->t(''),
      '#default_value' => $this->configuration['company_name'],
      '#maxlength' => 64,
      '#size' => 64,
      '#weight' => '0',
    ];
    $form['company_address'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Company address'),
      '#description' => $this->t(''),
      '#default_value' => $this->configuration['company_address'],
      '#maxlength' => 255,
      '#size' => 255,
      '#weight' => '0',
    ];
    $form['company_phone'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Company phone'),
      '#description' => $this->t(''),
      '#default_value' => $this->configuration['company_phone'],
      '#maxlength' => 64,
      '#size' => 64,
      '#weight' => '0',
    ];
    $form['company_fax'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Company fax'),
      '#description' => $this->t(''),
      '#default_value' => $this->configuration['company_fax'],
      '#maxlength' => 64,
      '#size' => 64,
      '#weight' => '0',
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    $this->configuration['company_name'] = $form_state->getValue('company_name');
    $this->configuration['company_address'] = $form_state->getValue('company_address');
    $this->configuration['company_phone'] = $form_state->getValue('company_phone');
    $this->configuration['company_fax'] = $form_state->getValue('company_fax');
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#theme' => 'gs_custom_company_address',
      '#company_name' => $this->configuration['company_name'],
      '#company_address' => $this->configuration['company_address'],
      '#company_phone' => $this->configuration['company_phone'],
      '#company_fax' => $this->configuration['company_fax'],
    ];
  }

}
