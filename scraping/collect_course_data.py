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


def code_to_semester(result):
    """
    Convert a course code to a semester
    """
    code = result['srcdb']
    subcode = code[4:]
    if subcode == '10':
        return 'Fall'
    elif subcode == '15':
        return 'Winter'
    elif subcode == '20':
        return 'Spring'
    else:
        raise Exception("Invalid course code: " + code)


def filter_results(results):
    """
    Filter out results that don't have a valid CRN
    """
    seen_courses = set()
    results_filtered = []
    for result in results:
        if result['code'] not in seen_courses:
            seen_courses.add(result['code'])
            semesters = list(set(map(code_to_semester, filter(
                lambda x: x['code'] == result['code'], results))))
            results_filtered.append({
                'code': result['code'],
                'title': result['title'],
                'semesters': semesters,
                'crn': result['crn']
            })

    return results_filtered


def save_all_class_data():
    codes = get_course_codes()
    all_results = []
    for code in codes:
        data = get_classes(code)
        results = data['results']
        fixed_results = filter_results(results)
        all_results.extend(fixed_results)

        with open('scraping/data/courses/' + code + '.json', 'w') as f:
            json.dump(fixed_results, f, indent=4)
        print(code, ":", len(data['results']), "classes")

    with open('scraping/data/courses/complete.json', 'w') as f:
        json.dump(all_results, f, indent=4)
    print("Saved data for " + str(len(codes)) + " courses")


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
