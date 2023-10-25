from flask import Flask, jsonify
from dotenv import load_dotenv
import requests
import os
import json

app = Flask(__name__)
load_dotenv()
key = os.environ.get("KEY")

@app.route('/')
def send_message():
    return test().json()

def test():
    data = json.dumps({
            "model": "gpt-4",
            "messages": [{"role": "user", "content": "Say this is a test!"}],
            "temperature": 0.1
        })
    print(data)
    return requests.post(
        "https://api.openai.com/v1/chat/completions",
        headers= {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + key
        },
        data= data
    )

if __name__ == '__main__':
    app.run(debug=True, port=5000)