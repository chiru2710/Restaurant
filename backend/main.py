from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import mysql.connector
import bcrypt
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import json

# Load environment variables
load_dotenv()

app = FastAPI()

# ✅ ENABLE CORS (VERY IMPORTANT FOR VITE REACT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Database Connection
try:
    db = mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
        port=int(os.getenv("DB_PORT"))
    )
    cursor = db.cursor(dictionary=True)
    print("✅ Connected to MySQL Successfully!")
except Exception as e:
    print("❌ MySQL Connection Error:", e)
    raise Exception("Database Connection Failed")

# =========================
# Pydantic Models
# =========================

class RegisterRequest(BaseModel):
    name: str
    phone: str
    email: str
    password: str
    address: str

class LoginRequest(BaseModel):
    email: str
    password: str

class OrderRequest(BaseModel):
    user_id: int
    items: list
    total_price: int
    payment_mode: str

# =========================
# ROUTES
# =========================

@app.get("/")
def home():
    return {"message": "Backend is running"}

# -------------------------
# REGISTER USER
# -------------------------
@app.post("/register")
def register(user: RegisterRequest):
    hashed = bcrypt.hashpw(user.password.encode(), bcrypt.gensalt())

    sql = """
    INSERT INTO users (name, phone, email, password, address)
    VALUES (%s, %s, %s, %s, %s)
    """

    try:
        cursor.execute(
            sql,
            (
                user.name,
                user.phone,
                user.email,
                hashed.decode(),  # Store as string in MySQL
                user.address,
            ),
        )
        db.commit()
        return {"message": "Registered successfully"}

    except mysql.connector.IntegrityError:
        raise HTTPException(status_code=400, detail="Email already exists")

# -------------------------
# LOGIN USER
# -------------------------
@app.post("/login")
def login(user: LoginRequest):
    cursor.execute(
        """
        SELECT id, name, phone, email, address, password 
        FROM users WHERE email=%s
        """,
        (user.email,),
    )

    result = cursor.fetchone()

    if not result:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    stored_hash = result["password"]

    if not bcrypt.checkpw(user.password.encode(), stored_hash.encode()):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # ✅ Return full user details (needed for Profile.jsx)
    return {
        "id": result["id"],
        "name": result["name"],
        "phone": result["phone"],
        "email": result["email"],
        "address": result["address"],
    }

# -------------------------
# SAVE ORDER
# -------------------------
@app.post("/orders")
def create_order(order: OrderRequest):
    sql = """
    INSERT INTO orders (user_id, items, total_price, payment_mode)
    VALUES (%s, %s, %s, %s)
    """

    try:
        cursor.execute(
            sql,
            (
                order.user_id,
                json.dumps(order.items),  # Store as proper JSON
                order.total_price,
                order.payment_mode,
            ),
        )
        db.commit()
        return {"message": "Order saved successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# -------------------------
# GET ORDER HISTORY (FOR PROFILE PAGE)
# -------------------------
@app.get("/orders/{user_id}")
def get_orders(user_id: int):
    cursor.execute(
        """
        SELECT id, total_price, payment_mode, order_date 
        FROM orders WHERE user_id=%s
        """,
        (user_id,),
    )

    orders = cursor.fetchall()

    formatted_orders = [
        {
            "id": o["id"],
            "total": o["total_price"],
            "payment": o["payment_mode"],
            "date": o["order_date"].strftime("%Y-%m-%d %H:%M"),
        }
        for o in orders
    ]

    return formatted_orders
