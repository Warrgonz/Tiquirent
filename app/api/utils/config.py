import os
from dotenv import load_dotenv

load_dotenv()

class Keys:
    API_KEY = os.getenv("API_KEY")
