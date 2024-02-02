import time
from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    wait_time = between(1, 2)

    @task
    def centers_array_1(self):
        self.client.get(url="/api/1")

    @task
    def centers_array_2(self):
        self.client.get(url="/api/2")