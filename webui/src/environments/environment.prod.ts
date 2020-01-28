import { EnvironmentConfig } from "./i.config";

export const environment : EnvironmentConfig = {
  production: true,
  apiURL: '/api',
  apiEndPoints: {
    createDoctor: '/Doctor?Content-Type=application/json&Accept=application/json',
    createDoctorProfile: '/Doctor_profile?Content-Type=application/json&Accept=application/json',
    createPatient: '/Patient?Content-Type=application/json&Accept=application/json',
    createPatientProfile: '/Patient_profile?Content-Type=application/json&Accept=application/json',
    depenedentMappings: '/Dependent_Mappints?Content-Type=application/json&Accept=application/json',
    medicalRecordUpdate: '/Medical_Record?Content-Type=application/json&Accept=application/json',
    allowDoctorWrite: '/AllowAdoctorWrite?Content-Type=application/json&Accept=application/json',
    allowOtherDoctorsRead: '/AllowOtherDoctorsRead?Content-Type=application/json&Accept=application/json',
    appointCaretaker: '/appointCaretaker?Content-Type=application/json&Accept=application/json',
    revokeCaretaker: '/revokeCaretaker?Content-Type=application/json&Accept=application/json',
    revokeDoctorAccess: '/RevokeDoctorAccess?Content-Type=application/json&Accept=application/json',
    revokedoctorWrite: '/revokedoctorWrite?Content-Type=application/json&Accept=application/json',
    selectMedicalRecordByDoctorId: '/queries/selectMedicalRecordByDoctorId',
    selectMedicalRecordByDoctorAndPatientId: '/queries/selectMedicalRecordByDoctorAndPatientId',
    selectMedicalRecordByPatientId: '/queries/selectMedicalRecordByPatientId',
    selectDoctors: '/queries/selectDoctors',
    selectPatients: '/queries/selectPatients',
    selectAllMedicalRecords: '/queries/selectAllMedicalRecords',
    selectMedicalRecordByCartaker: '/queries/selectMedicalRecordByCartaker',
    selectHistory: 'system/historian',
  }
};
