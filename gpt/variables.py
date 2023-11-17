import os

gpt_exchange = "GPT_EXCHANGE"
gpt_api_key = os.getenv("GPT_API_KEY")
queue_from_spring = "QUEUE_FROM_SPRING"
queue_from_flask = "QUEUE_FROM_FLASK"
routing_key_to_spring = "TO_SPRING"
routing_key_to_flask = "TO_FLASK"
rabbitmq_user = os.getenv("RABBITMQ_USER")
rabbitmq_pass = os.getenv("RABBITMQ_PASSWORD")
rabbitmq_host = os.getenv("RABBITMQ_HOST")
rabbitmq_port = os.getenv("RABBITMQ_PORT")
