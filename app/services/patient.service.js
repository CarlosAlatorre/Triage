triage
  .factory('patientService', ['$q', function ($q) {

    return{
      setPatient: function (patient) {

        firebase.database().ref('Hospital/pacientes').push(patient);

      },

      getPatientQueue: function(){
        var deferred = $q.defer();
        firebase.database().ref('Hospital/colaPacientes')
        .on('value', function(DataSnapshot){
          var response = DataSnapshot.val();
          
          deferred.resolve(response);
        })

        return  deferred.promise;
      }
    }
  }]);
