import os
import pika
import atexit
import logging


def make_connection():
    logging.info("START: CREATING CONNECTION")
    # rabbitMQ
    cred = pika.PlainCredentials(
        username=os.getenv("RABBITMQ_USER"),
        password=os.getenv("RABBITMQ_PASSWORD"),
    )

    connection = pika.BlockingConnection(
        pika.ConnectionParameters(
            host=os.getenv("RABBITMQ_HOST"),
            port=int(os.getenv("RABBITMQ_PORT")),
            credentials=cred,
        )
    )

    atexit.register(connection.close)
    logging.info("DONE: CREATING CONNECTION")
    return connection
