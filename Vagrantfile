# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  config.vm.define "gswebplay" do |node|
    node.vm.box = "ubuntu/focal64"
    node.vm.hostname = "gswebplay"
    node.vm.network "private_network", ip: "192.168.50.11"
    node.vm.synced_folder ".", "/vagrant", disabled: true
    node.vm.provider "virtualbox" do |vb|
      vb.name = "gswebplay"
      vb.cpus = 2
      vb.memory = 2048
    end

    node.vm.provision "file", source: "~/.gitconfig", destination: ".gitconfig"
    node.vm.provision "file", source: "~/.ssh/id_rsa", destination: ".ssh/"
    node.vm.provision "file", source: "~/.ssh/id_rsa.pub", destination: ".ssh/"
    node.vm.provision "file", source: "~/.ssh/gsweb18.pem", destination: ".ssh/"
    # cp ~/Drive/provision/ubuntu/env.example ./.env
    node.vm.provision "file", source: "./.env", destination: ".env"

    node.vm.provision "shell", path: "~/Drive/provision/ubuntu/bootstrap.sh"
    node.vm.provision "shell", path: "~/Drive/provision/ubuntu/vagrant.sh", privileged: false
    node.vm.provision "shell", path: "~/Drive/provision/ubuntu/mariadb.sh", privileged: false
    node.vm.provision "shell", path: "~/Drive/provision/ubuntu/php.sh", privileged: false
    node.vm.provision "shell", path: "~/Drive/provision/ubuntu/nodejs.sh", privileged: false
  end

end
