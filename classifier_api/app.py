from flask import Flask, request, jsonify, render_template
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.mobilenet import preprocess_input
import numpy as np
import os
import cv2 as op
import matplotlib.pyplot as plt

app = Flask(__name__)

MobileNetV2_classifier = load_model('MobileNetV2_classifier.keras')

d_names = {
    0: 'clean',
    1: 'dirty',
}

# Define the home route to render the HTML page
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle image upload and prediction
@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected image'}), 400
    
    # Save the uploaded file temporarily
    file_path = os.path.join('temp', file.filename)
    file.save(file_path)

    # Load and preprocess a single image
    try:
        img = plt.imread(file_path)[:, :, :3]  # Ensure the image has 3 channels (RGB)
        img_resized = op.resize(img, (224, 224))  # Resize to the model's input size
        img_preprocessed = preprocess_input(img_resized)  # Apply MobileNetV2 preprocessing
        img_reshaped = np.expand_dims(img_preprocessed, axis=0)  # Reshape to match input shape (1, 224, 224, 3)

        # Predict the class
        predicted_class_index = np.argmax(MobileNetV2_classifier.predict(img_reshaped), axis=1)[0]
        predicted_class = d_names[predicted_class_index]
        
        # Clean up the temporary file
        os.remove(file_path)
        
        return jsonify({'prediction': predicted_class})

    except Exception as e:
        os.remove(file_path)  # Clean up on error
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Ensure the temp directory exists
    os.makedirs('temp', exist_ok=True)
    app.run(debug=True)
