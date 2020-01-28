'use strict';

/**
 * Create and store an EHR
 * Allow doctor to write in the patient history and enable to have access to add new preception
 * @param {org.example.sample.AllowAdoctorWrite} allowDoctor
 * * @return {Promise} Asset Registry Promise
 * @transaction
 */
function AuthorizeDoctors(allowDoctor){
  		return getAssetRegistry('org.example.sample.Patient').then(function(assetRegistery){
			allowDoctor.patient.authorized.push(allowDoctor.DoctorId); 
  			return assetRegistery.update(allowDoctor.patient);
        });
  		throw "Too big";
}


/**
 * Remove doctor to write any records on patient
 * @param {org.example.sample.RevokeDoctorAccess} allowDoctor
 * * @return {Promise} Asset Registry Promise
 * @transaction
 */
function RevokeDoctorsAccess(allowDoctor){
		return getAssetRegistry('org.example.sample.Patient').then(function(assetRegistery){
	  allowDoctor.patient.authorized.splice(allowDoctor.patient.authorized.indexOf(allowDoctor.DoctorId),1); 
		return assetRegistery.update(allowDoctor.patient);
  });
	throw "Too big";
}



/**
 * Create and store an EHR
 * Remove access to medical records
 * @param {org.example.sample.revokedoctorWrite} allowAccess
 * * @return {Promise} Asset Registry Promise
 * @transaction
 */
function RevokeDoctors(allowAccess){

	var id=allowAccess.id;
	var doc2_id=allowAccess.doctor2.DoctorId;
	
	return getAssetRegistry('org.example.sample.Medical_Record').then(function(assetRegistery) {
		
			if(id==allowAccess.record.DoctorId){
						allowAccess.record.version++;	
					allowAccess.record.authorized.splice(allowAccess.record.authorized.indexOf(doc2_id),1);
					 return assetRegistery.update(allowAccess.record);
			}
			else if(id==allowAccess.record.PatientId){
						allowAccess.record.version++;	
						allowAccess.record.authorized.splice(allowAccess.record.authorized.indexOf(doc2_id),1);
					 return assetRegistery.update(allowAccess.record);
			}
			else{
					 for(var i=0;i<allowAccess.record.authorized.length;i++){
				if(allowAccess.record.authorized[i]==id){
												allowAccess.record.version++;
												allowAccess.record.authorized.splice(allowAccess.record.authorized.indexOf(doc2_id),1);
												return assetRegistery.update(allowAccess.record);
									 }
					 }
			}
			throw "Too big";
	});



//return getAssetRegistry('org.example.sample.Patient').then(function(assetRegistery){
//	  allowDoctor.patient.authorized.splice(allowDoctor.patient.authorized.indexOf(allowDoctor.DoctorId),1); 
//		return assetRegistery.update(allowDoctor.patient);
 // });
//	throw "Too big";
}

/**
 * Create and store an EHR
 * @param {org.example.sample.UpdateRecord} updaterecord
 * * @return {Promise} Asset Registry Promise
 * @transaction
 */

function onUpdateRecord(updaterecord) {
  	      return getAssetRegistry('org.example.sample.Medical_Record').then(function(assetRegistery) {
      		var record_id =	updaterecord.record_id;
			record = getFactory().newResource('org.example.sample', 'Medical_Record', record_id);
          	return query( 'selectPatients').then(function(results){
                for(var i=0;i<results.length;i++){
                    if(results[i].PatientId==updaterecord.PatientId){
                      
                        for(var j=0;j<results[i].authorized.length;j++){
                          
                            if(updaterecord.DoctorId==results[i].authorized[j]){
                              	//record.record_id=updaterecord.record_id;
                              	record.PatientId=updaterecord.PatientId;
                              	record.DoctorId=updaterecord.DoctorId;
                              	record.version=0;
                              	record.authorized=updaterecord.authorized;
                				record.Diagnosis_CD=updaterecord.Diagnosis_CD;
                              	record.Diagnosis=updaterecord.Diagnosis;
								record.encounter_time=updaterecord.encounter_time;
								record.Route=updaterecord.Route;
								record.Prescribed_Medicine=updaterecord.Prescribed_Medicine;
								record.Allergies=updaterecord.Allergies;
								record.Vitals=updaterecord.Vitals;
                                return assetRegistery.add(record); 
                            }
                        }
                    } 	 
                
            	}
            throw "Too big";
            }); 
	});
}

/**
 * Allow a doctor to access a medical record
 * @param {org.example.sample.AllowOtherDoctorsRead} allowAccess 
 * * @return {Promise} Asset Registry Promise
 * @transaction
 */

function allowDoctor(allowAccess){	
	var id=allowAccess.id;
  	var doc2_id=allowAccess.doctor2.DoctorId;
  	
  	return getAssetRegistry('org.example.sample.Medical_Record').then(function(assetRegistery) {
    	
      	if(id==allowAccess.record.DoctorId){
          		allowAccess.record.version++;	
        		allowAccess.record.authorized.push(doc2_id);
       			return assetRegistery.update(allowAccess.record);
        }
      	else if(id==allowAccess.record.PatientId){
          		allowAccess.record.version++;	
        		allowAccess.record.authorized.push(doc2_id);
       			return assetRegistery.update(allowAccess.record);
        }
      	else{
             for(var i=0;i<allowAccess.record.authorized.length;i++){
					if(allowAccess.record.authorized[i]==id){
                      		allowAccess.record.version++;
                     		allowAccess.record.authorized.push(doc2_id);	
                      		return assetRegistery.update(allowAccess.record);
                     }
             }
        }
      	throw "Too big";
    });
} 



/**
 * Update Cartaker details
 * @param {org.example.sample.appointCaretaker} updaterecord
 * * @return {Promise} Asset Registry Promise
 * @transaction
 */

function onUpdateCareTaker(updaterecord) {
  	return getAssetRegistry('org.example.sample.Medical_Record').then(function(assetRegistery) {
			updaterecord.record.version++;
      updaterecord.record.authorized.push(updaterecord.cartaker);	
      return assetRegistery.update(updaterecord.record);
        
		});
		

}


/**
 * Update Cartaker details
 * @param {org.example.sample.revokeCaretaker} updaterecord
 * * @return {Promise} Asset Registry Promise
 * @transaction
 */

function onRevokeCareTaker(updaterecord) {
	return getAssetRegistry('org.example.sample.Medical_Record').then(function(assetRegistery) {
		updaterecord.record.version++;
		updaterecord.record.authorized.splice(updaterecord.record.authorized.indexOf(updaterecord.cartaker),1);
		return assetRegistery.update(updaterecord.record);
			
	});
}

