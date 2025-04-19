import os
import smtplib
from email.message import EmailMessage
import string
import secrets
import threading
from dotenv import load_dotenv

load_dotenv()

sender_email = os.getenv("EMAIL_SENDER")
password = os.getenv("PASSWORD_MAIL")

def send_email(receiver_email, subject, body):
    msg = EmailMessage()
    msg.set_content(body, subtype='html')
    msg['Subject'] = subject
    msg['From'] = sender_email
    msg['To'] = receiver_email

    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as smtp:
            smtp.starttls()
            smtp.login(sender_email, password)
            smtp.send_message(msg)
            print(f"✅ Correo enviado a {receiver_email}")
    except Exception as e:
        print(f"❌ Error al enviar el correo a {receiver_email}: {e}")

def send_email_async(receiver_email, subject, body):
    threading.Thread(target=send_email, args=(receiver_email, subject, body)).start()