import time
from locust import HttpUser, tast, between

class WebsiteUser(HttpUser):
    wait_time = between(1, 5)

    @task
    def centers_array_1(self):
        self.client.get(url="/api/1")

    @task
    def centers_array_2(self):
        self.client.get(url="/api/2")