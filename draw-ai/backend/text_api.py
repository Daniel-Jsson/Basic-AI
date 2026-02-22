import requests
import base64
import numpy as np
from PIL import Image
import io

img = Image.new('L', (28, 28), color=128)
buffered = io.BytesIO()
img.save(buffered, format="PNG")
img_str = base64.b64encode(buffered.getvalue()).decode()

url = "http://localhost:5000/predict"
data = {"image": f"data:image/png;base64,{img_str}"}

try:
    response = requests.post(url, json=data)
    print("Response from Server:", response.json())
except Exception as e:
    print("Could not connect to server. Is app.py running?")