
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private baseUrl = environment.apiURL;
  private patientId = '';
  constructor(private http: HttpClient) { }

  saveDoctor(doctorId: String) {
    const body = {
      '$class': 'org.example.sample.Doctor',
      'DoctorId': doctorId
    }
    return this.http.post(this.baseUrl + environment.apiEndPoints.createDoctor, body).pipe(map(data => {
      return data;
    }));
  }

  saveDoctorProfile(docProfile: any) {
    const body = {
      '$class': 'org.example.sample.Doctor_profile',
      'profile_id': docProfile.profile_id,
      'Doctor': 'resource:org.example.sample.Doctor#' + docProfile.doctorId,
      'providerName': docProfile.providerName,
      'Provider_Type': docProfile.Provider_Type,
      'EmailAddress': docProfile.EmailAddress,
      'Provider_Contact': docProfile.Provider_Contact,
      'address': {
        '$class': 'org.example.sample.Address',
        'number': docProfile.address.number,
        'street': docProfile.address.street,
        'city': docProfile.address.city,
        'country': docProfile.address.country,
        'PinCode': docProfile.address.PinCode
      }
    }
    return this.http.post(this.baseUrl + environment.apiEndPoints.createDoctorProfile, body).pipe(map(data => {
      return data;
    }));
  }

  savePatient(patientId: String) {
    const body = {
      '$class': 'org.example.sample.Doctor',
      'PatientId': patientId,
      'authorized': []
    }
    return this.http.post(this.baseUrl + environment.apiEndPoints.createPatient, body).pipe(map(data => {
      return data;
    }));
  }

  savePatientProfile(patientProfile: any) {
    const body = {
      '$class': 'org.example.sample.Patient_profile',
      'profile_id': patientProfile.profile_id,
      'Patient': 'resource:org.example.sample.Patient#' + patientProfile.profile_id,
      'patientName': patientProfile.patientName,
      'gender': patientProfile.gender,
      'age': patientProfile.age,
      'dob': patientProfile.dob,
      'Marital_Status': patientProfile.Marital_Status,
      'blood_Group': patientProfile.blood_Group,
      'Occupation': patientProfile.Occupation,
      'Home_Phone': patientProfile.Home_Phone,
      'Work_Phone': patientProfile.Work_Phone,
      'Email_Address': patientProfile.Email_Address,
      'address': {
        '$class': 'org.example.sample.Address',
        'number': patientProfile.address.number,
        'street': patientProfile.address.street,
        'city': patientProfile.address.city,
        'country': patientProfile.address.country,
        'PinCode': patientProfile.address.PinCode,
      },
      'Insurance_Provider': ['UHC']

    }
    return this.http.post(this.baseUrl + environment.apiEndPoints.createPatientProfile, body).pipe(map(data => {
      return data;
    }));
  }

  dependentMappings(mappingInfo: any) {
    const body = {
      '$class': 'org.example.sample.Dependent_Mappints',
      'iKey': mappingInfo.iKey,
      'independent_profile_id': mappingInfo.independent_profile_id,
      'dependent_profile_id': mappingInfo.dependent_profile_id
    }
    return this.http.post(this.baseUrl + environment.apiEndPoints.depenedentMappings, body).pipe(map(data => {
      return data;
    }));
  }

  updateMedicalRecord(medicalRecord: any) {
    let providerId = sessionStorage.getItem('providerId');
    let patientId = sessionStorage.getItem('dependentId');
    const body = {
      '$class': 'org.example.sample.Medical_Record',
      'record_id': Math.floor(Math.random() * 99) + 200,
      'PatientId': patientId,
      'DoctorId': providerId,
      'version': 0,
      'authorized': [providerId],
      'Diagnosis_CD': "   ",
      'Diagnosis': medicalRecord.diagnosis,
      'Route': medicalRecord.route,
      'Prescribed_Medicine': medicalRecord.medicine,
      'Allergies': medicalRecord.allergies,
      'Vitals': medicalRecord.vitals,
      'encounter_time': new Date().toISOString(),
      // 'transactionId': '',
      // 'timestamp': new Date().toISOString()
    }
    return this.http.post(this.baseUrl + environment.apiEndPoints.medicalRecordUpdate, body).pipe(map(data => {
      return data;
    }));
  }

  allowDoctorWrite(docWrite: any) {
    const body = {
      '$class': 'org.example.sample.AllowAdoctorWrite',
      'patient': 'org.example.sample.Patient#' + sessionStorage.getItem('dependentId'),
      'DoctorId': docWrite,
      'transactionId': '',
      'timestamp': new Date().toISOString()
    }
    return this.http.post(this.baseUrl + environment.apiEndPoints.allowDoctorWrite, body).pipe(map(data => {
      return data;
    }));
  }

  allowOtherDoctorsRead(docRead: any) {
    const body = {
      '$class': 'org.example.sample.AllowOtherDoctorsRead',
      'id': sessionStorage.getItem('dependentId'),
      'record': 'resource:org.example.sample.Medical_Record#' + docRead.id,
      'doctor2': 'resource:org.example.sample.Doctor#' + docRead.doctor2,
      'transactionId': '',
      'timestamp': new Date().toISOString()
    }
    return this.http.post(this.baseUrl + environment.apiEndPoints.allowOtherDoctorsRead, body).pipe(map(data => {
      return data;
    }));
  }

  appointCaretaker(obj: any) {
    const body = {
      '$class': 'org.example.sample.appointCaretaker',
      'patient': 'resource:org.example.sample.Patient#' + obj.patient,
      'record': 'resource:org.example.sample.Medical_Record#' + obj.record,
      'cartaker': obj.cartaker,
      'transactionId': '',
      'timestamp': new Date().toISOString()
    }
    return this.http.post(this.baseUrl + environment.apiEndPoints.appointCaretaker, body).pipe(map(data => {
      return data;
    }));
  }

  revokeCaretaker(obj: any) {
    const body = {
      '$class': 'org.example.sample.revokeCaretaker',
      'patient': 'resource:org.example.sample.Patient#' + obj.patient,
      'record': 'resource:org.example.sample.Medical_Record#' + obj.record,
      'cartaker': obj.cartaker,
      'transactionId': '',
      'timestamp': new Date().toISOString()
    }
    return this.http.post(this.baseUrl + environment.apiEndPoints.revokeCaretaker, body).pipe(map(data => {
      return data;
    }));
  }

  revokeDoctorAccess(record_id: any) {
    this.patientId = sessionStorage.getItem('dependentId');
    const body = {
      '$class': 'org.example.sample.RevokeDoctorAccess',
      'patient': 'resource:org.example.sample.Patient#' + this.patientId,
      'DoctorId': record_id,
      'transactionId': '',
      'timestamp': new Date().toISOString()
    }
    return this.http.post(this.baseUrl + environment.apiEndPoints.revokeDoctorAccess, body).pipe(map(data => {
      return data;
    }));
  }

  revokedoctorWrite(obj: any) {
    this.patientId = sessionStorage.getItem('dependentId');
    const body = {
      '$class': 'org.example.sample.revokedoctorWrite',
      'id': this.patientId,
      'record': 'resource:org.example.sample.Medical_Record#' + obj.id,
      'doctor2': 'resource:org.example.sample.Doctor#' + obj.doctor2,
      'transactionId': '',
      'timestamp': new Date().toISOString()
    }
    return this.http.post(this.baseUrl + environment.apiEndPoints.revokedoctorWrite, body).pipe(map(data => {
      return data;
    }));
  }

  getMedicalRecordsByDoctorId(DoctorId: string) {
    return this.http.get(this.baseUrl + environment.apiEndPoints.selectMedicalRecordByDoctorId + '?DoctorId=' + DoctorId).pipe(map(data => {
      return data;
    }));
  }

  getMedicalRecordsByDoctorIdAndPatientId(DoctorId: string, patientId: string) {
    return this.http.get(this.baseUrl + environment.apiEndPoints.selectMedicalRecordByDoctorAndPatientId
      + '?DoctorId=' + DoctorId + '&PatientId=' + patientId).pipe(map(data => {
        return data;
      }));
  }

  getMedicalRecordsByPatientId() {
    this.patientId = sessionStorage.getItem('dependentId');
    return this.http.get(this.baseUrl + environment.apiEndPoints.selectMedicalRecordByPatientId
      + '?PatientId=' + this.patientId).pipe(map(data => {
        return data;
      }));
  }

  getAllDoctors() {
    return this.http.get(this.baseUrl + environment.apiEndPoints.selectDoctors
    ).pipe(map(data => {
      return data;
    }));
  }

  getAllPatients() {
    return this.http.get(this.baseUrl + environment.apiEndPoints.selectPatients
    ).pipe(map(data => {
      return data;
    }));
  }

  getAllMedicalRecords() {
    return this.http.get(this.baseUrl + environment.apiEndPoints.selectAllMedicalRecords
    ).pipe(map(data => {
      return data;
    }));
  }

  getMedicalRecordByCartaker(caregiverID: string) {
    return this.http.get(this.baseUrl + environment.apiEndPoints.selectMedicalRecordByCartaker
      + '?caregiverID=' + caregiverID).pipe(map(data => {
        return data;
      }));
  }

  getHistory() {
    return this.http.get(this.baseUrl + environment.apiEndPoints.selectHistory
    ).pipe(map(data => {
      return data;
    }));
  }

}
