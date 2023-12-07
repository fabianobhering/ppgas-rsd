echo "ATUALIZANDO..."
sudo apt -y  update
echo "INSTALANDO O APACHE..."
sudo apt -y install apache2
echo "INSTALANDO O NODEJS..."
sudo apt -y install nodejs
sudo apt -y install npm
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
sudo npm install pm2 -g
sudo npm install --prefix projeto
nvm install 18
echo "INSTALANDO O MOSQUITTO..."
sudo apt -y install mosquitto
sudo apt -y install mosquitto-clients
sudo bash -c 'cat << EOF > /etc/mosquitto/mosquitto.conf
listener 1883
protocol mqtt
allow_anonymous true
EOF'
