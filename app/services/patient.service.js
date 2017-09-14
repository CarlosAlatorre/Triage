triage
  .factory('patientService', ['$q', function ($q) {

    return{
      setPatient: function (patient) {

        firebase.database().ref('Hospital/pacientes').push(patient);

      }
    }
  }]);
