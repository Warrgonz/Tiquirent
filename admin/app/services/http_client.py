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
            return []

    def post(self, endpoint, data=None, json=None, headers=None, files=None):
        try:
            if files:
                headers = self._headers(headers, content_type=False)
                response = requests.post(
                    f"{self.base_url}{endpoint}",
                    headers=headers,
                    data=data,
                    files=files
                )
            elif json:
                response = requests.post(
                    f"{self.base_url}{endpoint}",
                    headers=self._headers(headers),
                    json=json
                )
            elif data:
                headers = self._headers(headers, content_type=False)
                headers["Content-Type"] = "application/x-www-form-urlencoded"
                response = requests.post(
                    f"{self.base_url}{endpoint}",
                    headers=headers,
                    data=data
                )
            else:
                headers = self._headers(headers)
                response = requests.post(
                    f"{self.base_url}{endpoint}",
                    headers=headers
                )

            response.raise_for_status()
            return response.json()

        except requests.HTTPError as e:
            print("❌ HTTPError:", e)
        try:
            return response.json()
        except ValueError:
            print("❌ La respuesta no es JSON:")
            print(response.text)
            return {"message": "❌ El servidor no devolvió JSON válido"}
        except requests.RequestException as e:
            print("❌ Error general:", e)
        return {"message": "❌ Error de conexión con la API"}

    
    def delete(self, endpoint, headers=None):
        try:
            response = requests.delete(
                f"{self.base_url}{endpoint}",
                headers=self._headers(headers, content_type=False)
            )
            response.raise_for_status()
            return response.json()
        except requests.HTTPError as e:
            print("❌ HTTPError en DELETE:", e)
            try:
                return response.json()
            except ValueError:
                print("❌ La respuesta no es JSON:")
                print(response.text)
                return {"message": "❌ El servidor no devolvió JSON válido"}
        except requests.RequestException as e:
            print("❌ Error general en DELETE:", e)
            return {"message": "❌ Error de conexión con la API"}



