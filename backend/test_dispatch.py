import requests

url = 'http://127.0.0.1:5000/api/trips/dispatch'

# This matches the exact JSON structure your frontend teammate will eventually send
payload = {
    "vehicle_id": 1,
    "driver_id": 1,
    "source": "Warehouse A",
    "destination": "City Center",
    "cargo_weight_kg": 450.0
}

print("Sending dispatch request...")
response = requests.post(url, json=payload)

print(f"Status Code: {response.status_code}")
print(f"Response: {response.json()}")