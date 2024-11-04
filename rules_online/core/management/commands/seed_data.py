from django.core.management.base import BaseCommand
from django.conf import settings
import csv

from core.models import SystemCode
from schools.models import School
from django.contrib.auth.models import Group, Permission

DATA_DIR = f'{settings.BASE_DIR}/static/data'

def load_permissions():
  # Load permission data from CSV file and create or update permissions in the database.
  with open(f'{DATA_DIR}/permissions.csv', 'r') as file:
    reader = csv.DictReader(file)

    for row in reader:
      group = Group.objects.get(name=row['group'])
      permission = Permission.objects.get(codename=row['permission'])
      group.permissions.add(permission)
      
    print(f'{Permission.objects.all().count()} Permissions loaded successfully.')

def load_groups():
  # Load group data from CSV file and create or update groups in the database.
  with open(f'{DATA_DIR}/groups.csv', 'r') as file:
    reader = csv.DictReader(file)

    for row in reader:
      try:
        group = Group.objects.get(name=row['name'])
        group.permissions.clear()  # Clear existing permissions for the group.
        group.save()

      except Group.DoesNotExist:  # If the group does not exist, create it.
        Group.objects.create(name=row['name']) #, description=row['description'])

    print(f'{Group.objects.all().count()} Groups loaded successfully.')
    
def load_system_codes():
  with open(f'{DATA_DIR}/system_codes.csv', 'r') as file:
    reader = csv.DictReader(file)

    for row in reader:
      # Create or update system code in the database. If the system code already exists, update its details.
      try:
        system_code = SystemCode.objects.get(domain=row['domain'], code=row['code'])
        system_code.description = row['description']
        system_code.integer_value = row['integer_value']
        system_code.alt_description = row['alt_description']
        system_code.save()
      
      except SystemCode.DoesNotExist:  # If the system code does not exist, create it.
        SystemCode.objects.create(domain=row['domain'], code=row['code'], description=row['description'], integer_value=row['integer_value'], alt_description=row['alt_description'])  

    print(f'{SystemCode.objects.all().count()} System codes loaded successfully.')

# Comes from the following site: https://discover.data.vic.gov.au/dataset/school-locations-2023

def load_vic_schools():
  with open(f'{DATA_DIR}/vic_schools.csv', 'r', encoding='cp1252') as file:
    reader = csv.DictReader(file)

    for row in reader:
      longitude = 0
      latitude = 0
      if len(row['X']) != 0:
        longitude = float(row['X'])

      if len(row['Y']) != 0:
        latitude = float(row['Y'])

      try:
        school = School.objects.get(school_no=int(row['School_No']))
        school.school_name = row['School_Name']
        school.school_type = row['School_Type']
        school.school_status = row['School_Status']
        school.address_line_1 = row['Address_Line_1']
        school.address_line_2 = row['Address_Line_2']
        school.address_town = row['Address_Town']
        school.address_state = row['Address_State']
        school.address_postcode = row['Address_Postcode']
        school.postal_address_line_1 = row['Postal_Address_Line_1']
        school.postal_address_line_2 = row['Postal_Address_Line_2']
        school.postal_town = row['Postal_Town']
        school.postal_state = row['Postal_State']
        school.postal_postcode = row['Postal_Postcode']
        school.full_phone_no = row['Full_Phone_No']
        school.lga_id = int(row['LGA_ID'])
        school.lga_name = row['LGA_Name']
        school.longitude = longitude
        school.latitude = latitude
        school.save()

      except School.DoesNotExist:
        School.objects.create(school_no=int(row['School_No']), school_name=row['School_Name'], school_type=row['School_Type'], 
                              school_status=row['School_Status'], address_line_1=row['Address_Line_1'], 
                              address_line_2=row['Address_Line_2'], address_town=row['Address_Town'], 
                              address_state=row['Address_State'], address_postcode=row['Address_Postcode'],
                              postal_address_line_1=row['Postal_Address_Line_1'], 
                              postal_address_line_2=row['Postal_Address_Line_2'], 
                              postal_town=row['Postal_Town'], postal_state=row['Postal_State'], 
                              postal_postcode=row['Postal_Postcode'], full_phone_no=row['Full_Phone_No'], 
                              lga_id=int(row['LGA_ID']), lga_name=row['LGA_Name'], longitude=longitude, latitude=latitude)  

    print(f'{School.objects.all().count()} Victorian schools loaded successfully.')

class Command(BaseCommand):
   def handle(self, *args, **options):
    load_system_codes()
    load_vic_schools()
    load_groups()
    # load_permissions()