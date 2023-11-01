import os
import pika
import atexit
import time


class SingletonConnection:
    _instance = None
    connection = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(SingletonConnection, cls).__new__(cls)
            cls._instance.name = "SingletonConnection"
        return cls._instance

    def connect(self, credentials, max_retries=5):
        try:
            self.connection = pika.BlockingConnection(
                pika.ConnectionParameters(
                    host=os.getenv("RABBITMQ_HOST"),
                    port=os.getenv("RABBITMQ_PORT"),
                    credentials=credentials,
                )
            )
        except pika.exceptions.AMQPConnectionError:
            retry_count = 0
            while retry_count < max_retries:
                retry_count += 1
                print("retrying connection")
                time.sleep(5)
                self.connect(credentials)
            if retry_count >= max_retries:
                print("rabbitMQ max retries reached. Failed to connect")
                raise

    def close(self):
        if self.connection:
            self.connection.close()


# rabbitMQ
cred = pika.PlainCredentials(
    username=os.getenv("RABBITMQ_USER"), password=os.getenv("RABBITMQ_PASSWORD")
)
instance = SingletonConnection()
instance.connect(cred)
connection = instance.connection
atexit.register(connection.close)
