from django.conf.urls import url

from clock_app import views

urlpatterns = [
    url(r'^index', views.index, name="index"),
    url(r'^time/belt/add', views.add_belt, name="add_new_time_belt"),
    url(r'^api/clock', views.DepartmentList.as_view(), name="clock_api")
]
