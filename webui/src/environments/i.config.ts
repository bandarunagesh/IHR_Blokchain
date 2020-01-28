export interface EnvironmentConfig {
    production: boolean;
    apiURL: string;
    apiEndPoints: {
        createDoctor: string;
        createDoctorProfile: string;
        createPatient: string;
        createPatientProfile: string;
        depenedentMappings: string;
        medicalRecordUpdate: string;
        allowDoctorWrite: string;
        allowOtherDoctorsRead: string;
        appointCaretaker: string;
        revokeCaretaker: string;
        revokeDoctorAccess: string;
        revokedoctorWrite: string;
        selectMedicalRecordByDoctorId: string;
        selectMedicalRecordByDoctorAndPatientId: string;
        selectMedicalRecordByPatientId: string;
        selectDoctors: string;
        selectPatients: string;
        selectAllMedicalRecords: string;
        selectMedicalRecordByCartaker: string;
        selectHistory: string;
    }
}
