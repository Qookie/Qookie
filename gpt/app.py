from flask import Flask, request, jsonify
import pika
from threading import Thread
from rabbitmq_connection import make_connection
from gpt_client import send_to_gpt
import json

app = Flask(__name__)


@app.route("/gpt", methods=["POST"])
def send_letter():
    data = request.json
    ret = send_to_gpt(data["name"], data["category"], data["letter"])
    return ret.json()


@app.route("/gpt/rabbit/send", methods=["GET"])
def rabbit_send():
    body = {"content": "testContent", "heartId": 7}
    global connection

    channel = connection.channel()
    # channel.queue_declare(queue="queue_from_flask")
    # channel.queue_bind(
    #     queue="queue_from_flask", exchange="test_exchange2", routing_key="to_spring"
    # )
    channel.basic_publish(
        exchange="test_exchange2", routing_key="to_spring", body=json.dumps(body)
    )
    # channel.close()
    return jsonify("sent!")


def callback(ch, method, properties, body):
    # app.logger.info("received: " + body)
    print("received: " + body)


def listen_spring(connection_: pika.BlockingConnection):
    try:
        print("listening")
        channel = connection.channel()

        # channel.exchange_declare(
        #     exchange="test_exchange2", exchange_type="direct", durable=False
        # )

        channel.queue_declare(queue="from_spring")
        channel.queue_bind(
            queue="from_spring", exchange="test_exchange2", routing_key="to_flask"
        )

        channel.basic_consume(
            queue="from_spring", on_message_callback=callback, auto_ack=True
        )
        channel.start_consuming()
    except Exception as e:
        print(f"ERROR: {e}")


# if __name__ == "__main__":
print("A")
# rabbitMQ
connection = make_connection()
# listener_thread = Thread(target=listen_spring, args=(connection,))
# listener_thread.daemon = True
# listener_thread.start()

# flask
# app.run(debug=False, port=5001)
# app.run()
