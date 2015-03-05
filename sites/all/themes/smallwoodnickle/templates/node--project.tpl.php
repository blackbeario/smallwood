<?php
/**
 * @file
 * Default theme implementation to display a node.
 */
?>

<header class="mainpic">
  <?php print render($content['field_project_image'][0]);?>
</header>

<article id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>
  <h1 id="title">
    <?php print render($title);?>
  </h1>
  <em class="tags">
    <span class="label"><?php print render($content['field_project_tags']['#title']);?></span>
    <?php print render($content['field_project_tags']);?>
  </em>
  <section class="desc">
    <?php print render($content['body']);?>
  </section>
  <section class="photos">
    <?php print render($content['field_project_image']);?>
  </section>
  <section class="pager">
    <?php print render($content['flippy_pager']);?>
  </section>
</article>
