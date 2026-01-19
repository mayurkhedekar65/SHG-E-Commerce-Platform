"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from main.views import group_data,get_products
from Products.views import get_products_data,get_group_profile_data,delete_product
from Customers.views import get_username,get_user_profile_data
from django.conf import settings 
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('products/',get_products),
    path('shggroups/',group_data),
    path('groupform/',include('groups.urls')),
    path('userform/',include('Customers.urls')),
    path('loginform/',include('Customers.urls')),
    path('shgloginform/',include('groups.urls')),
    path('adminpanel/',include('groups.urls')),
    path('get_products/',get_products_data),
    path('get_grp_profile/',get_group_profile_data),
    path('getusername/',get_username),
    path('get_user_profile/',get_user_profile_data),
    path('delete_product/<int:id>/',delete_product),
    
    
    
    
    # path("api/token/", TokenObtainPairView.as_view()),
    # path("api/token/refresh/", TokenRefreshView.as_view()),

]



if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)






