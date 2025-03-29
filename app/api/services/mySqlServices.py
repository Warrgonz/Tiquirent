import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

class MySQLService:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(MySQLService, cls).__new__(cls)
            cls._instance._connection = mysql.connector.connect(
                host=os.getenv("MYSQL_HOST"),
                user=os.getenv("MYSQL_USER"),
                password=os.getenv("MYSQL_PASSWORD"),
                database=os.getenv("MYSQL_DATABASE"),
                port=os.getenv("MYSQL_PORT")
            )
            cls._instance._cursor = cls._instance._connection.cursor(dictionary=True)
        return cls._instance

    def get_connection(self):
        return self._connection

    def get_cursor(self):
        return self._cursor

    def close_connection(self):
        if self._connection.is_connected():
            self._cursor.close()
            self._connection.close()
            MySQLService._instance = None  # Reset instance
