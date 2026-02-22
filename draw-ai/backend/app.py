from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

model = tf.keras.models.load_model('draw-ai/models/temp_model.keras')
categories = ['aircraft carrier', 'airplane', 'ambulance', 'ant', 'anvil', 'apple', 'axe', 'backpack', 'banana', 'baseball bat', 'baseball', 'bat', 'bear', 'bed', 'bee', 'belt', 'bench', 'bird', 'book', 'boomerang', 'bowtie', 'brain', 'bread', 'broom', 'bucket', 'bulldozer', 'bus', 'The Eiffel Tower', 'The Mona Lisa']

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json['image']
    img_bytes = io.BytesIO(tf.io.decode_base64(data.split(',')[1]).numpy())
    
    img = Image.open(img_bytes).convert('L').resize((28, 28))
    img_array = np.array(img).reshape(1, 28, 28, 1) / 255.0
    
    predictions = model.predict(img_array)
    index = np.argmax(predictions)
    
    return jsonify({
        "prediction": categories[index],
        "confidence": float(np.max(predictions))
    })

if __name__ == '__main__':
    app.run(port=5000)