from django.urls import path
from hello_world.views import payView

app_name = "hello_world"

urlpatterns = [
    path('pay', payView)
]
