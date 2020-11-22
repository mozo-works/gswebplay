[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/mozo-works/gswebplay)

# gswebplay.com

drupal composer project
https://github.com/drupal-composer/drupal-project

twelve-factor-drupal
https://github.com/shomeya/twelve-factor-drupal

## development

```zsh
$ vagrant up && vagrant ssh
$ cd /vagrant/
$ composer install
$ cp /vagrant/.env.example /vagrant/.env # edit DSN
$ drush rs /
```

## development log

### after upgrade to core 8.3.6

```
drush sql-query "DELETE FROM key_value WHERE collection='system.schema' AND name='layout_plugin';"
```

# https://github.com/gitpod-io/gitpod/issues/1800
GIT_COMMITER_EMAIL