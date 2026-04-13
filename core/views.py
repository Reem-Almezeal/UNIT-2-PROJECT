from django.shortcuts import render
from django.template import loader
from django.http import HttpRequest,HttpResponse
import json
from django.conf import settings
from django.http import JsonResponse
import google.generativeai as genai

# Create your views here.

def home_page_views(request:HttpRequest):
    return render(request, 'core/home.html')

def cities_page_views(request:HttpRequest):
    return render(request, 'core/cities.html')

def tourism_page_views(request:HttpRequest):
    return render(request, 'core/tourism.html')

def transport_page_views(request:HttpRequest):
    return render(request, 'core/transport.html')

def events_page_views(request:HttpRequest):
    return render(request, 'core/events.html')

def ai_assistant_page_views(request:HttpRequest):
    return render(request, 'core/ai_assistant.html')

def contact_page_views(request:HttpRequest):
    return render(request, 'core/contact.html')


def technology_page_views(request:HttpRequest):
    return render(request, 'core/technology.html')



def ai_assistant(request):
    return render(request, "core/ai_assistant.html")



def ai_chat_api(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    try:
        data = json.loads(request.body)
        user_message = data.get("message", "").strip()

        if not user_message:
            return JsonResponse({"error": "No message provided"}, status=400)

        genai.configure(api_key=settings.GEMINI_API_KEY)
        model = genai.GenerativeModel("gemini-2.5-flash")

        prompt = f"""
        You are KsaFuture AI Assistant.

        You are a smart AI assistant like ChatGPT.
        You can answer any user question clearly and helpfully, even if it is unrelated to Saudi Arabia, travel, or this website.

        Your special role:
        - If the user asks for a trip or visit plan, create a DETAILED itinerary.
        - The itinerary MUST match the exact number of days or duration requested by the user.
        - If the user says 1 day, give 1 day only.
        - If the user says 2 days, give Day 1 and Day 2.
        - If the user says 3 days or more, organize by Day 1, Day 2, Day 3, etc.
        - Each day should include:
            Morning
            Afternoon
            Evening
            Night

        If the user is asking a normal question:
        - Answer directly and clearly.
        - Do NOT force the answer into a travel plan.
        - If the question is about a place, explain it.
        - If the question is about the website, help the user clearly.
        - If the question is general knowledge, answer normally like a general AI assistant.

        When relevant, you may use Saudi Arabia 2034 destinations and experiences such as:
        Riyadh, Jeddah, AlUla, NEOM, THE LINE, Qiddiya, Riyadh Metro, Riyadh Season,
        Jeddah Waterfront, FIFA World Cup zones, Formula 1 experiences, sports venues,
        smart transport, cultural districts, entertainment destinations, luxury resorts.

        Important rules:
        - Be specific and useful.
        - Do not give vague advice.
        - If making a plan, mention actual places when possible.
        - If the user asks something unrelated, still answer helpfully.

        User request:
        {user_message}
        """

        response = model.generate_content(prompt)
        reply_text = response.text.strip() if response.text else "I can help with that. Please try asking in a clearer way."

        return JsonResponse({
            "reply": reply_text
        })

    except Exception as e:
        print("AI ERROR:", str(e))
        return JsonResponse({
            "reply": f"AI ERROR: {str(e)}"
        })