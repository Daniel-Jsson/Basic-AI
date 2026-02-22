from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image, ImageOps
import io
import base64

app = Flask(__name__)
CORS(app)

model = tf.keras.models.load_model('draw-ai/models/temp_model.keras')

categories = ['aircraft carrier', 'airplane', 'ambulance', 'ant', 'anvil', 'apple',
            'axe', 'backpack', 'banana', 'baseball bat', 'baseball', 'bat', 'bear', 
            'bed', 'bee', 'belt', 'bench', 'bird', 'book', 'boomerang', 'bowtie', 
            'brain', 'bread', 'broom', 'bucket', 'bulldozer', 'bus', 'The Eiffel Tower', 
            'The Mona Lisa']

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json['image']
        img_data = base64.b64decode(data.split(',')[1])
        image = Image.open(io.BytesIO(img_data))
        
        bg = Image.new("RGB", image.size, (255, 255, 255))
        if image.mode == 'RGBA':
            bg.paste(image, mask=image.split()[3]) 
        else:
            bg.paste(image)
            
        image = bg.convert("L")
        image = ImageOps.invert(image)
        
        bbox = image.getbbox()
        if bbox:
            image = image.crop(bbox)
            width, height = image.size
            new_size = max(width, height) + 20
            new_img = Image.new("L", (new_size, new_size), 0)
            new_img.paste(image, ((new_size - width) // 2, (new_size - height) // 2))
            image = new_img

        image = image.resize((28, 28), Image.Resampling.LANCZOS)
        
        img_array = np.array(image).astype('float32') / 255.0
        img_array = img_array.reshape(1, 28, 28, 1)
        
        predictions = model.predict(img_array)
        index = np.argmax(predictions)
        
        return jsonify({
            "prediction": categories[index],
            "confidence": float(np.max(predictions))
        })
        
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)