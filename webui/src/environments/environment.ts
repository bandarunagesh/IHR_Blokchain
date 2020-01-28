import { EnvironmentConfig } from "./i.config";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment: EnvironmentConfig = {
  production: false,
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
