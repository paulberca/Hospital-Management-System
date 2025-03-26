import json
import random
import os
from datetime import datetime, timedelta
from faker import Faker

# Initialize faker
fake = Faker()

def generate_patients(count=20):
    """Generate random patient data"""
    patients = []
    conditions = ['Stable', 'Critical', 'Recovering']
    blood_types = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']
    allergies = [
        'Penicillin', 'Peanuts', 'Latex', 'Shellfish', 'Dust', 
        'Pollen', 'Sulfa Drugs', 'None'
    ]
    chronic_conditions = [
        'Diabetes', 'Hypertension', 'Asthma', 'Heart Disease', 
        'Arthritis', 'Migraine', 'Epilepsy', 'Thyroid Disorder',
        'High Cholesterol', 'None'
    ]
    insurance_providers = [
        'Blue Cross Blue Shield', 'Aetna', 'Cigna', 'UnitedHealthcare',
        'Humana', 'Kaiser Permanente', 'Oscar Health', 'Medicare', 'Medicaid',
        'Anthem Blue Cross'
    ]
    
    # Current date for calculations
    current_date = datetime.now()
    
    for i in range(1, count + 1):
        # Generate a date of birth between 18 and 90 years ago
        age = random.randint(18, 90)
        dob = current_date - timedelta(days=age*365 + random.randint(0, 364))
        
        # Generate admission date within last 2 years
        admission_days_ago = random.randint(0, 730)  # Up to 2 years ago
        admission_date = current_date - timedelta(days=admission_days_ago)
        
        # Generate random allergies (0-3)
        patient_allergies = []
        allergy_count = random.randint(0, 3)
        if allergy_count > 0:
            patient_allergies = random.sample([a for a in allergies if a != 'None'], allergy_count)
        else:
            patient_allergies = ['None']
            
        # Create the patient
        gender = random.choice(['Male', 'Female'])
        patient = {
            'id': i,
            'name': fake.name(),
            'dateOfBirth': dob.strftime('%Y-%m-%d'),
            'gender': gender,
            'contactNumber': fake.phone_number(),
            'homeAddress': f"{fake.street_address()}, {fake.city()}, {fake.state_abbr()}",
            'allergies': patient_allergies,
            'bloodType': random.choice(blood_types),
            'chronicCondition': random.choice(chronic_conditions),
            'familyDoctor': f"Dr. {fake.name()}",
            'insurance': random.choice(insurance_providers),
            'admissionDate': admission_date.strftime('%Y-%m-%d'),
            'condition': random.choice(conditions)
        }
        patients.append(patient)
    
    return patients

def save_to_js_file(patients, output_path):
    """Save the generated patients to a JavaScript file"""
    # Format the patients array as pretty-printed JSON
    patients_json = json.dumps(patients, indent=2)
    
    # Create the JavaScript content
    js_content = f"export const initialPatients = {patients_json};\n"
    
    # Write to the file
    with open(output_path, 'w') as f:
        f.write(js_content)
    
    print(f"✅ Generated {len(patients)} patient records and saved to {output_path}")

if __name__ == "__main__":
    import sys
    
    # Set default values
    count = 20
    output_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 
                              'app', 'data', 'patientData.js')
    
    # Parse command line arguments
    if len(sys.argv) > 1:
        try:
            count = int(sys.argv[1])
        except ValueError:
            print("Error: Patient count must be a number.")
            sys.exit(1)
    
    if len(sys.argv) > 2:
        output_path = sys.argv[2]
    
    # Generate and save patients
    patients = generate_patients(count)
    save_to_js_file(patients, output_path)
    
    # Print a sample patient
    print("\nSample patient:")
    print(json.dumps(patients[0], indent=2))
    
    # Print usage instructions
    print("\nUsage:")
    print("python generate_patient_data.py [count] [output_path]")
    print("  count: Number of patients to generate (default: 20)")
    print("  output_path: Path to save the output file (default: ../app/data/patientData.js)")
