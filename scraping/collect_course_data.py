import requests

PAYLOAD = """%7B%22other%22%3A%7B%22srcdb%22%3A%22202120%22%7D%2C%22criteria%22%3A%5B%7B%22field%22%3A%22is_ind_study%22%2C%22value%22%3A%22N%22%7D%2C%7B%22field%22%3A%22is_canc%22%2C%22value%22%3A%22N%22%7D%2C%7B%22field%22%3A%22subject%22%2C%22value%22%3A%22CHEM%22%7D%5D%7D"""

def get_url(course_code):
    