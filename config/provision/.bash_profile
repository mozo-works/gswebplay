# .bash_profile

# Get the aliases and functions
if [ -f ~/.bashrc ]; then
	. ~/.bashrc
fi

# User specific environment and startup programs

PATH=$PATH:$HOME/.local/bin:$HOME/bin

export PATH=/home/vagrant/.config/composer/vendor/bin/:$PATH
alias composer="COMPOSER_MEMORY_LIMIT=-1 composer"
