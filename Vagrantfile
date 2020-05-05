# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "gbailey/amzn2"
  config.vm.network "forwarded_port", guest: 8888, host: 8888
  config.vm.network "forwarded_port", guest: 80, host: 8080
  config.vm.network "private_network", ip: "192.168.36.12"
  config.vm.synced_folder ".", "/vagrant", type: 'nfs', fsnotify: true, exclude: ['vendor', 'dump', 'node_modules']
  # config.vm.synced_folder ".", "/vagrant", id: "vagrant-root", mount_options: ["dmode=777", "fmode=777"]

  config.vm.provider "virtualbox" do |vb|
    vb.name = "gsweb"
    vb.memory = "2048"
  end

  config.vm.provision "shell", inline: <<-SHELL
    # set timezone to Asia/Seoul
    rm -f /etc/localtime && ln -s /usr/share/zoneinfo/Asia/Seoul /etc/localtime
    # add swap
    chmod +x /vagrant/config/provision/add-swap.sh && /vagrant/config/provision/add-swap.sh

    # install apache2, mariadb-10.2
    amazon-linux-extras enable lamp-mariadb10.2-php7.2
    yum -y install git deltarpm mariadb-server httpd patch

    # mysql_secure_installation
    mysql --user=root -e "DELETE FROM mysql.user WHERE User='';\
      DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');\
      DROP DATABASE IF EXISTS test; DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';\
      CREATE DATABASE IF NOT EXISTS gswebplay CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\
      USE gswebplay; SOURCE /vagrant/dump/dev.sql; FLUSH PRIVILEGES;"

    # install php7.4
    # amazon-linux-extras disable docker lamp-mariadb10.2-php7.2
    # amazon-linux-extras enable php7.4
    amazon-linux-extras disable docker
    yum -y install php-cli php-mysqlnd php-fpm php-gd php-opcache php-xml php-zip php-mbstring

    cp /vagrant/config/provision/localhost.vhost.conf /etc/httpd/conf.d/
    systemctl enable httpd mariadb php-fpm && systemctl start httpd mariadb php-fpm
  SHELL

  config.vm.provision "shell", privileged: false, inline: <<-SHELL
    # overwrite bash profile
    cp /vagrant/config/provision/.bash_profile ~/ && source .bash_profile

    # install composer
    php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
    php -r "if (hash_file('sha384', 'composer-setup.php') === 'e0012edf3e80b6978849f5eff0d4b4e4c79ff1609dd1e613307e16318854d24ae64f26d17af3ef0bf7cfb710ca74755a') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
    php composer-setup.php && php -r "unlink('composer-setup.php');"
    chmod +x composer.phar && sudo mv composer.phar /usr/local/bin/composer
    echo 'export PATH=/home/vagrant/.config/composer/vendor/bin/:$PATH' >> ~/.bash_profile && source ~/.bash_profile
    composer global require hirak/prestissimo

    # install drush launcher
    wget -O drush.phar https://github.com/drush-ops/drush-launcher/releases/latest/download/drush.phar
    chmod +x drush.phar && sudo mv drush.phar /usr/local/bin/drush

    # install nodejs
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
    . ~/.nvm/nvm.sh && nvm install --lts

    cd /vagrant && composer install
    cp -r /vagrant/config/provision/*.php /vagrant/web/sites/default/
  SHELL

  # https://www.vagrantup.com/docs/vagrantfile/vagrant_settings.html#config-vagrant-plugins
  # config.vagrant.plugins = "vagrant-notify-forwarder"

end
