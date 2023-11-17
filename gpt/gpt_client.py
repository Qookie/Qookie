import json
import time

import requests
import variables
from logger import logger as log


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
    max_retries = 5
    backoff_factor = 2
    for attempt in range(1, max_retries + 1):
        try:
            response = requests.post(
                "https://api.openai.com/v1/chat/completions",
                headers={
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + variables.gpt_api_key,
                },
                data=data,
            )
            print("RRR:", response)
            response.raise_for_status()
            json_response = response.json()
            log.info("from gpt: ", json_response)
            return json_response["choices"][0]["message"]["content"]
        except requests.exceptions.RequestException as e:
            if attempt == max_retries:
                raise
            else:
                log.error(
                    f"""
                        ERROR AT LISTENING: {e}
                        {attempt}'th try failed. Retrying in {backoff_factor**attempt} seconds.
                    """
                )
                time.sleep(backoff_factor**attempt)
