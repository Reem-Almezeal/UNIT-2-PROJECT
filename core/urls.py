from django.urls import path
from . import views

app_name = "core"

urlpatterns = [
    path('', views.home_page_views, name='home'),
    path('cities/', views.cities_page_views, name='cities'),
    path('tourism/', views.tourism_page_views, name='tourism'),
    path('transport/', views.transport_page_views, name='transport'),
    path('events/', views.events_page_views, name='events'),
    path('technology/', views.technology_page_views, name='technology'),
    path('ai_assistant/', views.ai_assistant_page_views, name='ai_assistant'),
    path('contact/', views.contact_page_views, name='contact'),
    path("ai-chat-api/", views.ai_chat_api, name="ai_chat_api"),

    

]