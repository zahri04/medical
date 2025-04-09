# ai_analysis/views.py

import os
import numpy as np
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.core.files.storage import default_storage
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image as keras_image

# Define the model path relative to your project base directory.
MODEL_PATH = os.path.join(settings.BASE_DIR, 'models', 'model_als.h5')

# Load the model (this happens when the server starts)
try:
    model = load_model(MODEL_PATH)
except Exception as e:
    # Log the error in production; here we'll simply raise it.
    raise Exception(f"Error loading model from {MODEL_PATH}: {e}")

@csrf_exempt
def predict_alzheimer(request):
    if request.method == "POST" and request.FILES.get('image'):
        img_file = request.FILES['image']
        # Save the image temporarily in MEDIA_ROOT/temp/
        temp_dir = os.path.join(settings.MEDIA_ROOT, 'temp')
        os.makedirs(temp_dir, exist_ok=True)
        temp_path = default_storage.save(os.path.join('temp', img_file.name), img_file)
        full_path = os.path.join(settings.MEDIA_ROOT, temp_path)

        # Preprocess the image (adjust target_size as per your model input)
        try:
            img = keras_image.load_img(full_path, target_size=(176, 176))
        except Exception as e:
            return JsonResponse({'error': f'Error loading image: {e}'}, status=400)
        img_array = keras_image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0) / 255.0

        # Make prediction and map to labels
        prediction = model.predict(img_array)
        # Assuming your model output is a classification result,
        # you might use np.argmax and a mapping dictionary:
        predicted_class = np.argmax(prediction, axis=1)[0]
        class_mapping = {
           0: 'MildDemented',
           1: 'ModerateDemented',
           2: 'NonDemented',
           3: 'VeryMildDemented'
        }
        predicted_label = class_mapping.get(predicted_class, "Unknown")
        return JsonResponse({'result': predicted_label})
    
    return JsonResponse({'error': 'Invalid request. Please provide an image.'}, status=400)
