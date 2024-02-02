import time
from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    wait_time = between(1, 2)

    @task
    def center_3(self):
        self.client.get(url="/api/center/3")

    @task
    def center_4(self):
        self.client.get(url="/api/center/4")

    @task
    def center_5(self):
        self.client.get(url="/api/center/5")

    @task
    def center_8(self):
        self.client.get(url="/api/center/8")

    @task
    def center_9(self):
        self.client.get(url="/api/center/9")

    @task
    def center_10(self):
        self.client.get(url="/api/center/10")

    @task
    def center_11(self):
        self.client.get(url="/api/center/11")

    @task
    def center_14(self):
        self.client.get(url="/api/center/14")