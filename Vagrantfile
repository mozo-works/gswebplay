# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "gbailey/amzn2"
  config.vm.network "forwarded_port", guest: 8888, host: 8888, id: "drush"
  config.vm.network "forwarded_port", guest: 80, host: 8080, id: "apache2"
  config.vm.network "forwarded_port", guest: 3000, host: 3000, id: "react"
  config.vm.network "private_network", ip: "192.168.36.12"
  config.vm.synced_folder ".", "/vagrant", type: 'nfs'

  config.vm.provider "virtualbox" do |vb|
    vb.name = "gsweb"
    vb.cpus = 2
    vb.memory = "2048"
  end

  config.vm.provision "file", source: "~/.gitconfig", destination: ".gitconfig"
  config.vm.provision "file", source: "~/.ssh/id_rsa", destination: ".ssh/"
  config.vm.provision "shell", inline: <<-SHELL
    # set timezone to Asia/Seoul
    rm -f /etc/localtime && ln -s /usr/share/zoneinfo/Asia/Seoul /etc/localtime
    # add swap
    chmod +x /vagrant/config/provision/add-swap.sh && /vagrant/config/provision/add-swap.sh

    echo "install apache2, mariadb-10.2"
    amazon-linux-extras enable lamp-mariadb10.2-php7.2
    yum -y install git deltarpm mariadb-server httpd patch

    echo "install php7.4"
    # yum -y remove php-cli php-mysqlnd php-fpm php-gd php-opcache php-xml php-zip php-mbstring
    amazon-linux-extras disable lamp-mariadb10.2-php7.2 docker
    amazon-linux-extras enable php7.4
    yum -y install php-cli php-mysqlnd php-fpm php-gd php-opcache php-xml php-zip php-mbstring

    cp /vagrant/config/provision/localhost.vhost.conf /etc/httpd/conf.d/
    systemctl enable httpd mariadb php-fpm && systemctl start httpd mariadb php-fpm

    echo "[mariadb] create database and restore"
    # mysql_secure_installation
    mysql -e "DELETE FROM mysql.user WHERE User='';\
      DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');\
      DROP DATABASE IF EXISTS test; DELETE FROM mysql.db WHERE Db='test';\
      CREATE DATABASE IF NOT EXISTS gswebplay CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\
      USE 'gswebplay'; SOURCE /vagrant/dump/dev.sql;\
      GRANT ALL PRIVILEGES ON gswebplay.* to vagrant@'localhost' IDENTIFIED BY 'vagrant'; FLUSH PRIVILEGES;"
  SHELL

  config.vm.provision "shell", privileged: false, inline: <<-SHELL
    # overwrite bash profile
    cp /vagrant/config/provision/.bash_profile ~/ && source .bash_profile

    # install composer
    curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
    echo 'export PATH=/home/vagrant/.config/composer/vendor/bin/:$PATH' >> ~/.bash_profile && source ~/.bash_profile

    # install drush launcher
    wget -O drush.phar https://github.com/drush-ops/drush-launcher/releases/latest/download/drush.phar
    chmod +x drush.phar && sudo mv drush.phar /usr/local/bin/drush

    # install nodejs
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
    . ~/.nvm/nvm.sh && nvm install --lts
    npm -g i yarn

    cd /vagrant && composer install
    chmod -R +w /vagrant/web/sites/default/
    cp -r /vagrant/config/provision/*.php /vagrant/web/sites/default/
  SHELL

end
