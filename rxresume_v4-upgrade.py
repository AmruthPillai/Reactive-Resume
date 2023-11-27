#######################
# Python script to reformat date strings, convert Markdown links and images to HTML in a Reactive Resume JSON file
# Script Name: RXResumeV4Upgrade.py
# Author: Andy van der Gugten
# Date: 2023-11-27
# Usage: RXResumeV4Upgrade.py <path_to_json_file>
# Instructions: Run the script with the JSON file path as a command-line argument. 
# The script saves the processed file as reactive_resume-[xxx]_modified.json.
#######################

import json
import re
import sys
from datetime import datetime

def reformat_date_string(date_string, count):
    """
    Reformats the date string from "YYYY-MM-DDT00:00:00.000Z" to "YYYY-MM-DD"
    """
    try:
        new_date = datetime.strptime(date_string, "%Y-%m-%dT%H:%M:%S.%fZ").strftime("%Y-%m-%d")
        if new_date != date_string:
            count += 1
        return new_date, count
    except ValueError:
        return date_string, count

def markdown_to_html_image(text, count):
    """
    Converts Markdown images to HTML images in the given text.
    """
    markdown_image_pattern = r'!\[([^\]]*)\]\(([^)]+)\)'
    new_text, num_subs = re.subn(markdown_image_pattern, r'<img src="\2" alt="\1">', text)
    return new_text, count + num_subs

def markdown_to_html_link(text, count):
    """
    Converts Markdown links to HTML links in the given text.
    """
    markdown_link_pattern = r'(?<!\!)\[([^\]]+)\]\(([^)]+)\)'
    new_text, num_subs = re.subn(markdown_link_pattern, r'<a target="_blank" rel="noopener noreferrer nofollow" href="\2">\1</a>', text)
    return new_text, count + num_subs

def process_json_data(json_data):
    """
    Processes the JSON data to reformat date strings, convert Markdown links and images to HTML.
    Returns counts of dates, images, and links modified.
    """
    date_count = image_count = link_count = 0

    for section, content in json_data['sections'].items():
        if isinstance(content, dict) and 'items' in content and isinstance(content['items'], list):
            for item in content['items']:
                if 'date' in item:
                    date_parts = item['date'].split(' - ')
                    reformatted_dates = []
                    for date_part in date_parts:
                        new_date, date_count = reformat_date_string(date_part, date_count)
                        reformatted_dates.append(new_date)
                    item['date'] = ' - '.join(reformatted_dates)
                if 'summary' in item:
                    item['summary'], image_count = markdown_to_html_image(item['summary'], image_count)
                    item['summary'], link_count = markdown_to_html_link(item['summary'], link_count)

    return date_count, image_count, link_count

# Check if a file path is provided as a command-line argument
if len(sys.argv) < 2:
    print("Usage: RXResumeV4Upgrade.py <path_to_json_file>")
    sys.exit(1)

file_path = sys.argv[1]

# Load your JSON file
with open(file_path, 'r') as file:
    json_data = json.load(file)

# Process the JSON data and get counts
date_count, image_count, link_count = process_json_data(json_data)

# Generate the modified file path by adding a suffix
modified_file_path = file_path.replace('.json', '_modified.json')

# Save the modified JSON data back to a file
with open(modified_file_path, 'w') as file:
    json.dump(json_data, file, indent=4, ensure_ascii=False)

print(f"Processed file saved as: {modified_file_path}")
print(f"Dates modified: {date_count}")
print(f"Images converted: {image_count}")
print(f"Links converted: {link_count}")
