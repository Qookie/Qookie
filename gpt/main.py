import pika
import json

from rabbitmq_connection import make_connection
from gpt_client import send_to_gpt
from logger import logger as log
import variables


def callback(ch, method, properties, body):
    try:
        global connection
        data = json.loads(body)
        log.info(
            "received from spring: "
            + str(data["username"])
            + " / "
            + str(data["content"])
        )
        gpt_reply = send_to_gpt(data["username"], data["category"], data["content"])
        # send back to spring
        ret = {"heartId": data["heartId"], "content": gpt_reply}

        channel = connection.channel()
        channel.basic_publish(
            exchange=variables.gpt_exchange,
            routing_key=variables.routing_key_to_spring,
            body=json.dumps(ret),
        )
        channel.close()

        log.info("send success: " + gpt_reply)

    except Exception as e:
        log.error(f"ERROR AT CALLBACK: {e}")


def listen_spring(connection_: pika.BlockingConnection):
    try:
        log.info("listening")
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
        log.error(f"ERROR AT LISTENING: {e}")


if __name__ == "__main__":
    # rabbitMQ
    connection = make_connection()
    listen_spring(connection)
