from django.db import IntegrityError
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

from clock_app.models import TimeBelt, TimeBeltSerializer


def index(request):
    return render(request, "clock_app/index.html")


def add_belt(request):
    if request.GET:
        try:
            gmt = int(request.GET["gmt"])
            if gmt not in range(-23, 24):
                gmt = gmt % 24
                print(gmt)
            belt = TimeBelt.objects.create(gmt=gmt)
            belt.save()
            return HttpResponse("New time belt was added")
        except IntegrityError:
            return HttpResponse("This time belt is already exist")


class DepartmentList(APIView):
    def get(self, request):
        serializer = TimeBeltSerializer(TimeBelt.objects.all(), many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TimeBeltSerializer(TimeBelt.objects.all(), many=True)
        return Response(serializer.data)
