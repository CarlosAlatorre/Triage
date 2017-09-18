triage
  .factory('patientService', ['$q', 'dateService', function ($q, dateService) {

    return{
      setPatient: function (patient) {

        firebase.database().ref('Hospital/pacientes/' + patient.claveSeguro).set(patient);

      },

      addPatientToTheQueue: function (patient, symptoms) {

        var timeInQueue = new Date();
        timeInQueue.setMinutes(timeInQueue.getMinutes() + 1);

        var sintomas = symptoms;
        symptoms = {};

        symptoms['sintomas'] = sintomas;


        symptoms['nombre'] = patient.nombres + ' ' + patient.apellidos;
        symptoms['claveSeguro'] = patient.claveSeguro;
        symptoms['tiempoEnCola'] = timeInQueue.getTime();
        symptoms['fechaLimite'] = timeInQueue.toString();

        firebase.database().ref('Hospital/colaPacientes/').push(symptoms);

      },

      getPatient: function (patientKey) {
        var deferred = $q.defer();

        firebase.database().ref('Hospital/pacientes/' + patientKey)
          .once('value', function (dataSnapshot) {
            var response = dataSnapshot.val();
            response.fechaNacimiento  = new Date(response.fechaNacimiento);
            deferred.resolve(response);
          });

        return deferred.promise;
      }
    }
  }]);
