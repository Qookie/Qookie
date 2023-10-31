from flask import Flask, request, jsonify
from dotenv import load_dotenv
import requests
import os
import json
import pika

app = Flask(__name__)
load_dotenv()
key = os.environ.get("KEY")

# rabbitMQ
credentials = pika.PlainCredentials(
    username=os.getenv("RABBITMQ_USER"), password=os.getenv("RABBITMQ_PASSWORD")
)
connection = pika.BlockingConnection(
    pika.ConnectionParameters(
        host=os.getenv("RABBITMQ_HOST"),
        port=os.getenv("RABBITMQ_PORT"),
        credentials=credentials,
    )
)
channel = connection.channel()


@app.route("/gpt", methods=["POST"])
def send_letter():
    data = request.json
    ret = test(data["name"], data["category"], data["letter"])
    return ret.json()


@app.route("/gpt", methods=["GET"])
def send_test():
    return jsonify("server working!")


@app.route("/gpt/fast", methods=["POST"])
def send_fast():
    ret = test("testName", "testCategory", "DON'T MIND A LETTER! JUST SAY TEST!!!")
    return ret.json()


@app.route("/gpt/rabbit/send", methods=["GET"])
def rabbit_send():
    channel.queue_declare("test_queue")
    channel.basic_publish(exchange="", routing_key="test_queue", body="test_message")
    return jsonify("sent!")


def callback(ch, method, properties, body):
    print("received", body)


def start_consuming(queue):
    channel.queue_declare(queue)
    channel.basic_consume(queue, callback, auto_ack=True)
    channel.start_consuming()


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
    start_consuming("test_queue")
