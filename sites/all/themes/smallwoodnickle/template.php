<?php
/**
 * @file
 * Set variable for menu-footer-nav to use in page templates.
 */

function smallwoodnickle_preprocess_page(&$vars){
    $vars['footer_nav'] = theme('links', 
      array('links' => menu_navigation_links('menu-footer-nav')));
}
