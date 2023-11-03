import json
import requests
import os
from dotenv import load_dotenv
import logging

load_dotenv()
gpt_api_key = "Bearer " + os.getenv("GPT_API_KEY")


def prompt(user_name, category):
    return f"""
                You are going to offer appropriate feedback to {user_name}'s letter feeling {category}
                Because you are a psychology doctor, you use psychology theories to analyze the letter.
                Pick appropriate one among Albert Ellis' ABC model, Beck's Cognitive Triad, 
                and Cognitive Behavior Therapy. But do not expose the theory on the surface.
                If the letter is not about your domain, just say that it's not in your expertise.
                Please have warm, empathic, and especially friend-like tone, despite of your position.
                Also, when suggesting feedbacks, be suggestive, never be imperative.
                Write yours with Korean if {user_name}'s letter is written on Korean.
                When using Korean speak in plain language. You don't need to be too much polite.
                Lastly, keep it mind to make letter not to be too long.
                Make it under ten to twelve sentences long.
            """


def send_to_gpt(user_name, category, user_input):
    data = json.dumps(
        {
            "model": "gpt-4",
            "messages": [
                {
                    "role": "system",
                    "content": prompt(user_name, category),
                },
                {"role": "user", "content": user_input},
            ],
            "temperature": 0.8,
        }
    )
    json_response = requests.post(
        "https://api.openai.com/v1/chat/completions",
        headers={
            "Content-Type": "application/json",
            "Authorization": gpt_api_key,
        },
        data=data,
    ).json()
    logging.info(json_response)

    return json_response["choices"][0]["message"]["content"]
