import sys

import pika
import json
import logging

from rabbitmq_connection import make_connection
from gpt_client import send_to_gpt
import variables


def callback(ch, method, properties, body):
    global connection
    print("body: " + str(body))
    data = json.loads(body)
    print(data)
    gpt_reply = send_to_gpt(data["username"], data["category"], data["content"])
    # send back to spring
    ret = {"heartId": data["heartId"], "content": gpt_reply}

    # or use ch?
    channel = connection.channel()
    channel.basic_publish(
        exchange=variables.gpt_exchange,
        routing_key=variables.routing_key_to_spring,
        body=json.dumps(ret),
    )
    channel.close()

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


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    # rabbitMQ
    connection = make_connection()
    listen_spring(connection)
