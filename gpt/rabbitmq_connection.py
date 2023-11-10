import pika
import atexit
import logging
import variables


def make_connection():
    logging.info("START: CREATING CONNECTION")
    # rabbitMQ
    cred = pika.PlainCredentials(
        username=variables.rabbitmq_user,
        password=variables.rabbitmq_pass,
    )

    connection = pika.BlockingConnection(
        pika.ConnectionParameters(
            host=variables.rabbitmq_host,
            port=int(variables.rabbitmq_port),
            credentials=cred,
        )
    )

    atexit.register(connection.close)
    logging.info("DONE: CREATING CONNECTION")
    return connection
