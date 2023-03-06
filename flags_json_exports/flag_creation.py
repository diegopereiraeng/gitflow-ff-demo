# Developed by: Diego Pereira - Harness
# Date: 2023-03-05

import os
import requests
from dotenv import load_dotenv
import json

# load environment variables from .env file
load_dotenv()

# set the API key, account identifier, org identifier, project identifier, and environment identifier using environment variables
API_KEY = os.getenv('API_KEY')
ACCOUNT_IDENTIFIER = os.getenv('ACCOUNT_IDENTIFIER')
ORG_IDENTIFIER = os.getenv('ORG_IDENTIFIER')
PROJECT_IDENTIFIER = os.getenv('PROJECT_IDENTIFIER')


# set the endpoint URL
url = f'https://app.harness.io/gateway/cf/admin/features?accountIdentifier={ACCOUNT_IDENTIFIER}&orgIdentifier={ORG_IDENTIFIER}'

# create data variable
feature_flags=""

# flags's file directory
directory = 'flags_json_exports'

# check if directory exists and create it if not
if not os.path.exists(directory):
    os.makedirs(directory)

filename = os.path.join(directory, f'FF_LAB_FLAGS.json')

# read data from file
with open(filename, 'r') as f:
    feature_flags = json.load(f)


total=len(feature_flags)
created=[]


# print the name of each feature
for flag in feature_flags: 
    payload = {
        "name": flag["name"],
        "identifier": flag["identifier"],
        "description": flag["description"],
        "defaultOnVariation": flag["defaultOnVariation"],
        "defaultOffVariation": flag["defaultOffVariation"],
        "tags": flag["tags"],
        "kind": flag["kind"],
        "owner": "diego.pereira@harness.io",
        "project": PROJECT_IDENTIFIER,
        "permanent": True,
        "variations": flag["variations"],
    }
    headers = {
        "Content-Type": "application/json",
        "x-api-key": API_KEY
    }
    # print(json.dumps(flag))
    print(payload)
    response = requests.post(url, headers=headers, json=payload)
    
    if response.status_code == 201:
        print(f"Successfully created feature flag: {flag['name']}")
        created.append(flag)
    else:
        print(f"Error creating feature flag: {flag['name']}")
        print(response.content.decode('utf-8'))
        print(f"response code: {response.status_code}")

print("-----------------------")
print(f"Total flags: {total}")
print(f"Created: {len(created)}")
print("-----------------------")
