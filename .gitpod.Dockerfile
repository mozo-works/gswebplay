FROM gitpod/workspace-mysql

# Install custom tools, runtimes, etc.
# For example "bastet", a command-line tetris clone:
# RUN brew install bastet
#
# More information: https://www.gitpod.io/docs/config-docker/
RUN wget -O drush.phar https://github.com/drush-ops/drush-launcher/releases/latest/download/drush.phar
RUN mkdir -p ~/.local/bin
RUN chmod +x drush.phar && mv drush.phar ~/.local/bin/drush
RUN git config user.email mozodev@users.noreply.github.com
