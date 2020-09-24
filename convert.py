import tensorflow as tf
from tensorflow.keras.models import load_model

maskNet = load_model("mask_detector.model")

converter = tf.lite.TFLiteConverter.from_keras_model(maskNet)
tflite_model = converter.convert()
open("mask_detector.tflite", "wb").write(tflite_model)
