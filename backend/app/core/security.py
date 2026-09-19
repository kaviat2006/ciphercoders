import hashlib
import hmac
import base64
import json
import time
from typing import Optional, Dict, Any

SECRET_KEY = "talentflow_secret_key_change_in_production"
ALGORITHM = "HS256"

def hash_password(password: str) -> str:
    """Hashes password securely using SHA-256 with salt."""
    salt = "talentflow_salt_2026"
    return hashlib.sha256((password + salt).encode('utf-8')).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies plain password against hashed password."""
    return hash_password(plain_password) == hashed_password

def create_access_token(data: dict, expires_in_seconds: int = 86400) -> str:
    """Generates signed JWT token."""
    header = {"alg": "HS256", "typ": "JWT"}
    payload = data.copy()
    payload["exp"] = int(time.time()) + expires_in_seconds

    header_b64 = base64.urlsafe_b64encode(json.dumps(header).encode('utf-8')).decode('utf-8').rstrip('=')
    payload_b64 = base64.urlsafe_b64encode(json.dumps(payload).encode('utf-8')).decode('utf-8').rstrip('=')

    signature_input = f"{header_b64}.{payload_b64}".encode('utf-8')
    signature = hmac.new(SECRET_KEY.encode('utf-8'), signature_input, hashlib.sha256).digest()
    signature_b64 = base64.urlsafe_b64encode(signature).decode('utf-8').rstrip('=')

    return f"{header_b64}.{payload_b64}.{signature_b64}"

def decode_access_token(token: str) -> Optional[Dict[str, Any]]:
    """Decodes and validates signed JWT token."""
    try:
        parts = token.split('.')
        if len(parts) != 3:
            return None

        header_b64, payload_b64, signature_b64 = parts

        signature_input = f"{header_b64}.{payload_b64}".encode('utf-8')
        expected_sig = hmac.new(SECRET_KEY.encode('utf-8'), signature_input, hashlib.sha256).digest()
        expected_sig_b64 = base64.urlsafe_b64encode(expected_sig).decode('utf-8').rstrip('=')

        if not hmac.compare_digest(signature_b64, expected_sig_b64):
            return None

        # Add padding back if necessary
        payload_b64_padded = payload_b64 + '=' * (-len(payload_b64) % 4)
        payload_data = json.loads(base64.urlsafe_b64decode(payload_b64_padded.encode('utf-8')).decode('utf-8'))

        if payload_data.get("exp", 0) < int(time.time()):
            return None # Expired

        return payload_data
    except Exception:
        return None
