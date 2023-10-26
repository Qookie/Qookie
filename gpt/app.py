from flask import Flask, request
from dotenv import load_dotenv
import requests
import os
import json

app = Flask(__name__)
load_dotenv()
key = os.environ.get("KEY")


@app.route("/", methods=["POST"])
def send_message():
    data = request.json
    print(data)
    ret = test(data["name"], data["category"], data["letter"])
    print(data)
    return ret.json()


def test(user_name, category, user_input):
    data = json.dumps(
        {
            "model": "gpt-4",
            "messages": [
                {
                    "role": "system",
                    "content": f"""
                    You are going to offer appropriate feedback to {user_name}'s letter feeling {category}
                    Because you are a psychology doctor, you use psychology theories to analyze the letter.
                    Pick appropriate one among Albert Ellis' ABC model, Beck's Cognitive Triad, 
                    and Cognitive Behavior Therapy. But do not expose the theory on the surface.
                    If the letter is not about your domain, just say that it's not in your expertise.
                    Please have warm, empathic, and especially friend-like tone, despite of your position.
                    Also, when suggesting feedbacks, be suggestive, never be imperative.
                    Write yours with Korean if {user_name}'s letter is written on Korean.
                    When using Korean speak in plain language. You don't need to be too much polite.
                    Lastly, keep it mind to make letter not to be too long.
                    Make it under ten to twelve sentences long.
                """,
                },
                {"role": "user", "content": user_input},
            ],
            "temperature": 0.8,
        }
    )
    response = requests.post(
        "https://api.openai.com/v1/chat/completions",
        headers={"Content-Type": "application/json", "Authorization": "Bearer " + key},
        data=data,
    )
    print(response)
    return response


if __name__ == "__main__":
    app.run(debug=True, port=5000)
