
drupal composer project
https://github.com/drupal-composer/drupal-project

twelve-factor-drupal
https://github.com/shomeya/twelve-factor-drupal

## dev

```
cp .env.example .env
# add credential to .env file
subl .env
composer install
# go to webroot and install drupal site
cd web && drush si standard
drush rs /

# theme development
npm -g i gulp-cli bower
cd { project_root }/web/themes/contrib/radix && bower i
cd { project_root }/web/themes/custom/red/ && npm run setup && gulp
```


```
# after upgrade to core 8.3.6
drush sql-query "DELETE FROM key_value WHERE collection='system.schema' AND name='layout_plugin';"

```