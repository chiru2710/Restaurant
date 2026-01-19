import mysql.connector
import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

try:
    db = mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
        port=int(os.getenv("DB_PORT"))
    )

    cursor = db.cursor(dictionary=True)
    print("✅ MySQL Connected Successfully!")

except Exception as e:
    print("❌ MySQL Connection Failed:", e)
    raise Exception("Database Connection Failed")
