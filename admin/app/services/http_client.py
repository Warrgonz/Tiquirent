import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_BASE_URL = os.getenv("API_BASE_URL")
API_KEY = os.getenv("API_KEY")

class APIClient:
    def __init__(self, base_url=None, api_key=None):
        self.base_url = base_url or os.getenv("API_BASE_URL")
        self.api_key = api_key or os.getenv("API_KEY")

    def _headers(self, headers=None, content_type=True):
        default_headers = {"X-API-Key": self.api_key}
        if content_type:
            default_headers["Content-Type"] = "application/json"
        if headers:
            default_headers.update(headers)
        return default_headers

    def get(self, endpoint, headers=None, params=None):
        try:
            response = requests.get(
                f"{self.base_url}{endpoint}",
                headers=self._headers(headers, content_type=False),
                params=params
            )
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            #print("💥 HTTPError:", e)
            #print("📦 Status code:", response.status_code)
            #print("📨 Response content:", response.text)
            return []

    def post(self, endpoint, data, headers=None):
        try:
            response = requests.post(
                f"{self.base_url}{endpoint}",
                headers=self._headers(headers),
                json=data
            )
            response.raise_for_status()
            return response.json()
        except requests.HTTPError as e:
            #print("💥 HTTPError:", e)
            #print("📦 Status code:", response.status_code)
            #print("📨 Response content:", response.text)
            try:
                return response.json()
            except Exception as json_err:
                print("❌ Error parseando JSON:", json_err)
                return {"message": "Error inesperado del servidor"}
        except requests.RequestException as e:
            print("❌ POST error:", e)
        return {"message": "Error de conexión con la API"}



    def put(self, endpoint, data, headers=None):
        try:
            response = requests.put(
                f"{self.base_url}{endpoint}",
                headers=self._headers(headers),
                json=data
            )
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            print("PUT error:", e)
            return None

    def delete(self, endpoint, headers=None):
        try:
            response = requests.delete(
                f"{self.base_url}{endpoint}",
                headers=self._headers(headers, content_type=False)
            )
            response.raise_for_status()
            return True
        except requests.RequestException as e:
            print("DELETE error:", e)
            return False
