echo "ATUALIZANDO..."
sudo apt -y update
sudo apt -y upgrade
echo "INSTALANDO O APACHE..."
sudo apt -y install apache2
echo "INSTALANDO O MYSQL..."
sudo apt -y install mysql-server
echo "INSTALANDO O NODEJS..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
echo "REINICIAR O SERVIDOR"
nvm install 20
npm install pm2 -g
echo "INSTALANDO O MOSQUITTO..."
sudo apt -y install mosquitto
sudo apt -y install mosquitto-clients
sudo bash -c 'cat << EOF > /etc/mosquitto/mosquitto.conf
listener 1883
protocol mqtt
allow_anonymous true
EOF'
