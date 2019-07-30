# add below to last line of /etc/fstab
UUID=27e36756-c068-441c-aefc-21c81dc824e2       /data   ext4    defaults,nofail        0       2

# amazon linux 2 LAMP installation
sudo yum update -y
sudo amazon-linux-extras install lamp-mariadb10.2-php7.2
sudo yum install -y httpd php mariadb-server php-mysqlnd php-gd php-mbstring php-xml
sudo systemctl start httpd
sudo systemctl enable httpd

sudo usermod -a -G apache ec2-user
sudo chown -R ec2-user:apache /var/www/gswebplay/web

sudo systemctl start mariadb
sudo systemctl enable mariadb
sudo mysql_secure_installation

MariaDB [(none)]>create database `gsweb`;
MariaDB [(none)]>CREATE USER 'gsweb18'@'localhost' IDENTIFIED BY 'bPJtk1wIJidC3f@8';
MariaDB [(none)]>GRANT ALL ON gsweb.* TO 'gsweb18'@'localhost';
MariaDB [(none)]>FLUSH PRIVILEGES;

# GRANT ALL PRIVILEGES ON dbTest.* To 'user'@'hostname' IDENTIFIED BY 'password';

# set timezone
# https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/set-time.html
sudo nano /etc/sysconfig/clock
ZONE="Asia/Seoul"
sudo ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
sudo reboot

git clone https://github.com/mozo-works/gswebplay
sudo mv gswebplay /var/www/


```
SetEnv DATABASE_URL mysql://gsweb18:bPJtk1wIJidC3f%408@localhost/gsweb
SetEnv DRUPAL_HASH_SALT 9bf70e6d7b060937ba472d7c9a3fb103564cc8e9f976b501882b0684f994ca55
SetEnv DRUPAL_ENV production
SetEnv DRUPAL_INSTALL_PROFILE standard

PATH=`pwd`/bin:$PATH;
```
