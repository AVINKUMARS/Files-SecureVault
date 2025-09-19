from fastapi import FastAPI, UploadFile, Form, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import json
from typing import List, Dict
from pathlib import Path
from secure_file_encryption import encryption

# -------------------------
# Setup
# -------------------------

app = FastAPI(title="SecureVault Backend")

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

USER_DB = "users.json"
USER_DATA_DIR = "user_data"
Path(USER_DATA_DIR).mkdir(exist_ok=True)

# -------------------------
# Utility Functions
# -------------------------

def load_users() -> Dict:
    if not os.path.exists(USER_DB):
        return {}
    with open(USER_DB, "r") as f:
        return json.load(f)

def save_users(users: Dict):
    with open(USER_DB, "w") as f:
        json.dump(users, f)

def save_user_file(username: str, filename: str, file_type: str):
    users = load_users()
    if username in users:
        users[username]["files"].append({"name": filename, "type": file_type})
        save_users(users)

def load_user_files(username: str) -> List[Dict]:
    users = load_users()
    return users.get(username, {}).get("files", [])

# -------------------------
# Auth Endpoints
# -------------------------

@app.post("/register")
def register(username: str = Form(...), password: str = Form(...)):
    users = load_users()
    if username in users:
        return {"success": False, "message": "Username already exists."}
    users[username] = {"password": password, "files": []}
    save_users(users)
    return {"success": True, "message": "Account created successfully."}

@app.post("/login")
def login(username: str = Form(...), password: str = Form(...)):
    users = load_users()
    if username in users and users[username]["password"] == password:
        return {"success": True, "username": username}
    return {"success": False, "message": "Invalid credentials."}

# -------------------------
# File Encryption
# -------------------------

@app.post("/encrypt")
async def encrypt_file_endpoint(username: str = Form(...), file: UploadFile = None):
    if not file:
        raise HTTPException(status_code=400, detail="No file uploaded.")
    save_path = os.path.join(USER_DATA_DIR, f"{username}_{file.filename}")
    with open(save_path, "wb") as f:
        f.write(await file.read())
    
    encrypted_path = save_path + ".enc"
    encryption.encrypt_file(save_path, encrypted_path, username)
    save_user_file(username, file.filename, "encrypted")
    
    return FileResponse(encrypted_path, filename=file.filename + ".enc")

# -------------------------
# File Decryption
# -------------------------

@app.post("/decrypt")
async def decrypt_file_endpoint(username: str = Form(...), file: UploadFile = None):
    if not file:
        raise HTTPException(status_code=400, detail="No file uploaded.")
    save_path = os.path.join(USER_DATA_DIR, f"{username}_{file.filename}")
    with open(save_path, "wb") as f:
        f.write(await file.read())
    
    decrypted_path = save_path.replace(".enc", "")
    success = encryption.decrypt_file(save_path, decrypted_path, username)
    if not success:
        raise HTTPException(status_code=400, detail="Decryption failed.")
    
    save_user_file(username, file.filename.replace(".enc", ""), "decrypted")
    return FileResponse(decrypted_path, filename=os.path.basename(decrypted_path))

# -------------------------
# Fetch User Files
# -------------------------

@app.get("/files/{username}")
def get_user_files(username: str):
    files = load_user_files(username)
    return {"files": files}
