from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from common.email import send_email
# Create your views here.


@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password(request):
    reset_email = request.data.get("email")
    user = User.objects.filter(email=reset_email).first()
    if not user:
        return Response({"message": "user not found!"})
    else:
        uid = urlsafe_base64_encode(force_bytes(user.id))
        token = PasswordResetTokenGenerator().make_token(user)
        default_email = "contact@shgbazar.org"
        mail_sub = "password reset link"
        message = f"""
         click on below link to reset the password.
             http://127.0.0.1:5173/resetpassword/?uid={uid}&token={token}
        """
        print(message)
        send_email(request, default_email, reset_email, message, mail_sub)
        return Response({"message": "reset link generated"})

# forgot password view
@api_view(['POST'])
@permission_classes([AllowAny])
def set_new_password(request):
    uid = request.data.get("uid")
    token = request.data.get("token")
    new_password = request.data.get("newpassword")
    if not uid or not token or not new_password:
        return Response({"message":"uid, token and new_password are required"},status=400)
    try:
         user_id = urlsafe_base64_decode(uid).decode()
         user = User.objects.get(id=user_id)
    except:
        return Response({"message":"invalid uid"},status=400)
    
    if PasswordResetTokenGenerator().check_token(user, token):
        user.set_password(new_password)
        user.save()
        return Response({"message": "password reset successfully."})
    else:
        return Response({"message": "Invalid or expired token.."})
