from django.urls import path
from hello_universe.views import payView

app_name = "hello_universe"

urlpatterns = [
    path('pay', payView)
]
