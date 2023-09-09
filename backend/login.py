from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import HTTPException, Depends
import bcrypt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def register_user(user_type: str, details: dict):
    hashed_password = bcrypt.hashpw(details['password'].encode('utf-8'), bcrypt.gensalt())
    # Here, add the logic to save the hashed_password and other details to the database

    if user_type == "therapist":
        # Add the therapist to your database
        pass
    elif user_type == "patient":
        # Add the patient to your database
        pass
    else:
        raise HTTPException(status_code=400, detail="Invalid user type")

    return {"status": "success"}

async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = get_user_from_database(form_data.username)  # Your custom function to retrieve a user from your database
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    if not bcrypt.checkpw(form_data.password.encode('utf-8'), user.hashed_password.encode('utf-8')):
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    # If password is correct, return a token or any other logic you need


from google.oauth2 import id_token
from google.auth.transport import requests

GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"

@app.post("/google_login/")
async def google_login(token: str):
    try:
        # Validate the token
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)

        # Check that the user's email is verified
        if idinfo['email_verified']:
            email = idinfo['email']

            # Here, use the email to check if the user exists in your database
            # If they don't, you might want to create a new user entry

            return {"status": "success", "email": email}
        else:
            raise HTTPException(status_code=400, detail="Email not verified by Google")

    except ValueError:
        # Invalid token
        raise HTTPException(status_code=400, detail="Invalid Google token")
