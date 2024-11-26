#include "DHT.h"
#include "WiFi.h"
#include "PubSubClient.h"

#define DHTPIN 23
#define DHTTYPE DHT11

// Configuração do DHT
DHT dht(DHTPIN, DHTTYPE);

// Configuração do WiFi e MQTT
WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);

const char *SSID = ".....";
const char *PWD = ".....";
const char *mqttServer = "192.168.1.10";
const int mqttPort = 1883;

// ID exclusivo do dispositivo
uint64_t chipid = ESP.getEfuseMac();

void setup() {
    Serial.begin(115200);
    Serial.println("Inicializando...");

    // Inicia o sensor DHT
    dht.begin();

    // Conecta ao WiFi
    wifi_connect(SSID, PWD);

    // Conecta ao MQTT
    mqtt_connect(mqttServer, mqttPort);
}

void wifi_connect(const char *SSID, const char *PWD) {
    WiFi.begin(SSID, PWD);

    while (WiFi.status() != WL_CONNECTED) {
        Serial.print(".");
        delay(500);
    }

    Serial.println("\nConectado ao WiFi.");
    Serial.println(WiFi.localIP());
}

void mqtt_connect(const char *server, int port) {
    mqttClient.setServer(server, port);

    while (!mqttClient.connected()) {
        Serial.println("Conectando ao MQTT...");
        if (mqttClient.connect("ESP32_DHT11")) {
            Serial.println("Conectado ao broker MQTT.");
        } else {
            Serial.println("Falha na conexão ao MQTT. Tentando novamente...");
            delay(5000);
        }
    }
}

void loop() {
    // Leitura dos sensores
    float humidity = dht.readHumidity(); //random(0, 100);
    float temperature = dht.readTemperature(); //random(10, 50);

    if (isnan(humidity) || isnan(temperature)) {
        Serial.println("Falha ao ler do sensor DHT!");
        return;
    }

    Serial.printf("Umidade: %.2f%%\n", humidity);
    Serial.printf("Temperatura: %.2f°C\n", temperature);

    // Reconexão ao MQTT, se necessário
    if (!mqttClient.connected()) {
        mqtt_connect(mqttServer, mqttPort);
    }
    mqttClient.loop();

    // Envia dados a cada 5 segundos
    static long last_time = 0;
    long now = millis();
    if (now - last_time > 5000) {
        char data[128] = {0};
        snprintf(data, 128, "{\"Id\":%llu,\"Temperature\":%.2f,\"Humidity\":%.2f}", chipid, temperature, humidity);
        mqttClient.publish("dht/data", data);
        last_time = now;
    }
    delay(1000);
}
