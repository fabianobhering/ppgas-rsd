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
echo "INSTALANDO O Grafana..."
sudo apt-get install -y apt-transport-https software-properties-common wget
sudo mkdir -p /etc/apt/keyrings/
wget -q -O - https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt-get update
sudo apt-get install grafana
