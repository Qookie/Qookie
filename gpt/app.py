from flask import Flask, jsonify
from dotenv import load_dotenv
import os

app = Flask(__name__)

@app.route('/')
def send_message():
    load_dotenv()
    return jsonify(os.environ.get("AAAA"))

if __name__ == '__main__':
    app.run(debug=True, port=5000)