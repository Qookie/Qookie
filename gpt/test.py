import pika
from threading import Thread
from rabbitmq_connection import connection


def callback(ch, method, properties, body):
    print("received: ")
    print(body)


def listen_spring(connection_: pika.BlockingConnection):
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


if __name__ == "__main__":
    # rabbitMQ
    # listener_thread = Thread(target=listen_spring(connection))
    # listener_thread.daemon = True
    # listener_thread.start()
    listen_spring(connection)
