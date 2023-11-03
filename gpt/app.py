from flask import Flask, request, jsonify
import pika
from threading import Thread
from rabbitmq_connection import make_connection
from gpt_client import send_to_gpt
import json
import variables

app = Flask(__name__)


@app.route("/gpt", methods=["POST"])
def send_letter():
    data = request.json
    ret = send_to_gpt(data["name"], data["category"], data["letter"])
    return ret.json()


@app.route("/gpt/rabbit/send", methods=["GET"])
def rabbit_send():
    body = {"content": "testContent", "heartId": 7}
    global sending_connection

    channel = sending_connection.channel()
    channel.basic_publish(
        exchange=variables.gpt_exchange,
        routing_key=variables.routing_key_to_spring,
        body=json.dumps(body),
    )
    # channel.close()
    return jsonify("sent!")


def callback(ch, method, properties, body):
    print("body: " + str(body))
    data = json.load(body)
    print(data)
    print(data.username)
    print(data["username"])
    gpt_reply = send_to_gpt(data["username"], data["category"], data["content"])
    # send back to spring
    ret = {"heartId": data["heartId"], "content": gpt_reply}

    channel = sending_connection.channel()
    channel.basic_publish(
        exchange=variables.gpt_exchange,
        routing_key=variables.routing_key_to_spring,
        body=json.dumps(ret),
    )
    # channel.close()

    print("send: " + str(json.dumps(ret)))


def listen_spring(connection_: pika.BlockingConnection):
    try:
        print("listening")
        channel = connection_.channel()

        channel.queue_declare(queue=variables.queue_from_spring, durable=True)
        channel.queue_bind(
            queue=variables.queue_from_spring,
            exchange=variables.gpt_exchange,
            routing_key=variables.routing_key_to_flask,
        )
        channel.basic_consume(
            queue=variables.queue_from_spring,
            on_message_callback=callback,
            auto_ack=True,
        )
        channel.start_consuming()
    except Exception as e:
        print(f"ERROR: {e}")


# rabbitMQ
listening_connection = make_connection("listen")
listener_thread = Thread(target=listen_spring, args=(listening_connection,))
listener_thread.daemon = True
listener_thread.start()

sending_connection = make_connection("send")
