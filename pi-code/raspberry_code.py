# -*- coding: utf-8 -*-
import time
import board
import busio
import adafruit_dht
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in import AnalogIn
import csv
from datetime import datetime
import joblib

# the trained model 
MODEL_PATH = "/home/joshan/model.pkl"
model = joblib.load(MODEL_PATH)

#  (DHT11 connected to GPIO4) 
dhtDevice = adafruit_dht.DHT22(board.D4)

#  Set up ADS1115 (Soil Moisture Sensor) 
i2c = busio.I2C(board.SCL, board.SDA)
ads = ADS.ADS1115(i2c)
chan = AnalogIn(ads, ADS.P0)

# CSV file 
CSV_FILE = "sensor_log.csv"
header = ["Timestamp", "Temperature (C)", "Humidity (%)", "Soil Moisture (V)", "Field Health (%)", "Predicted Yield"]

# Write header if file not exists
try:
    with open(CSV_FILE, "x", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(header)
except FileExistsError:
    pass  # File exists, continue appending

print(" Real-time Monitoring Started (Ctrl+C to stop)\n")

try:
    while True:
        try:
            # Read sensors 
            temperature = dhtDevice.temperature
            humidity = dhtDevice.humidity
            soil_voltage = chan.voltage  # Analog voltage (0–3.3V)

            if None in (temperature, humidity, soil_voltage):
                raise RuntimeError("Sensor returned None")

            # Run model prediction 
            prediction = model.predict([[temperature, humidity, soil_voltage]])
            if hasattr(prediction[0], '__iter__'):
                field_health = round(prediction[0][0], 2)
                predicted_yield = round(prediction[0][1], 2)
            else:
                predicted_yield = round(prediction[0], 2)
                field_health = 100.0  # or simulate if model only gives yield

            # Timestamp and display
            timestamp = datetime.now().isoformat()
            print(f"[{timestamp}] Temp: {temperature}°C  Hum: {humidity}%  Soil: {soil_voltage:.2f}V")
            print(f"   → Health: {field_health}%   Yield: {predicted_yield} units\n")

            #  Save to CSV 
            with open(CSV_FILE, "a", newline="") as f:
                writer = csv.writer(f)
                writer.writerow([timestamp, temperature, humidity, soil_voltage, field_health, predicted_yield])

        except RuntimeError as e:
            print(f" Sensor error: {e}")

        time.sleep(5)

except KeyboardInterrupt:
    print("\n Monitoring stopped by user.")
