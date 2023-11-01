from flask import Flask, request, jsonify
import logging
import pika
from rabbitmq_connection import connection
from gpt_client import send_to_gpt

app = Flask(__name__)


@app.route("/gpt", methods=["POST"])
def send_letter():
    data = request.json
    ret = send_to_gpt(data["name"], data["category"], data["letter"])
    return ret.json()


@app.route("/gpt/rabbit/send", methods=["GET"])
def rabbit_send():
    channel = connection.channel()
    channel.queue_declare(queue="from_spring")
    channel.exchange_declare(exchange="from_spring", exchange_type="direct")
    channel.queue_bind(
        queue="from_spring", exchange="from_spring", routing_key="from_spring"
    )
    channel.basic_publish(
        exchange="from_spring", routing_key="from_spring", body="test_message"
    )
    return jsonify("sent!")


def callback(ch, method, properties, body):
    app.logger.info("received: " + body)
    print("received: " + body)


def listen_spring(connection_: pika.BlockingConnection):
    print("listening")
    channel = connection_.channel()
    channel.queue_declare(queue="from_spring", durable=True)
    channel.basic_consume("from_spring", callback, auto_ack=True)
    channel.start_consuming()


if __name__ == "__main__":
    app.logger.setLevel(level=logging.INFO)
    app.logger.info("INFO LOGING INFO LOGING INFO LOGING INFO LOGING INFO LOGING ")
    app.logger.warning(
        "warning LOGING warning LOGING warning LOGING warning LOGING warning LOGING "
    )
    app.logger.error(
        "error LOGING error LOGING error LOGING error LOGING error LOGING "
    )
    print("running1")
    app.run(debug=True, port=5000)
    print("running2")

    # rabbitMQ
    listen_spring(connection)
