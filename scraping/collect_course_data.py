from pyexpat.errors import codes
import requests
from bs4 import BeautifulSoup
import json
import os
import pandas as pd

PAYLOAD = "%7B%22other%22%3A%7B%22srcdb%22%3A%22999999%22%7D%2C%22criteria%22%3A%5B%7B%22field%22%3A%22is_ind_study%22%2C%22value%22%3A%22N%22%7D%2C%7B%22field%22%3A%22is_canc%22%2C%22value%22%3A%22N%22%7D%2C%7B%22field%22%3A%22subject%22%2C%22value%22%3A%22CODE%22%7D%5D%7D"  

def get_classes(course_code):
    url = "https://cab.brown.edu/api/?page=fose&route=search&is_ind_study=N&is_canc=N&subject=" + course_code
    payload = PAYLOAD.replace("CODE", course_code)
    response = requests.post(url, data=payload)
    return response.json()

def get_course_codes():
    url = "https://cab.brown.edu/"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    dropdown = soup.find(id='crit-subject')
    codes = []
    for child in dropdown.children:
        if child.name == 'option' and child.attrs['value']:
            codes.append(child['value'])
    return codes


def save_all_class_data():
    codes = get_course_codes()
    for code in codes:
        data = get_classes(code)
        results = data['results']


        with open('scraping/data/courses/' + code + '.json', 'w') as f:
            json.dump(data['results'], f, indent=4)
        print(code, ":", len(data['results']), "classes")

    print("Saved data for " + str(len(codes)) + " courses")


def class_data

def clear_save_directory():
    """
    Remove all files in directory scraping/data/courses/
    """
    path = 'scraping/data/courses/'
    for filename in os.listdir(path):
        file_path = os.path.join(path, filename)
        os.remove(file_path)

if __name__ == "__main__":
    clear_save_directory()
    save_all_class_data()