import logging
import sys

logger = logging.getLogger()
logger.setLevel(logging.INFO)

logger.addHandler(logging.StreamHandler(stream=sys.stdout))
logger.addHandler(logging.FileHandler("gpt.log", encoding="utf-8"))
