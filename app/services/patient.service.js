triage
  .factory('patientService', ['$q', 'dateService', function ($q, dateService) {

    return {
      setPatient: function (patient) {

        firebase.database().ref('Hospital/pacientes/' + patient.claveSeguro).set(patient);

      },

      addPatientToTheQueue: function (patient, symptoms, requisitos) {

        var timeInQueue = new Date();

        var sintomas = [];
        var nivelEmergencia = '';
        var nivelR = false;
        var nivelN = false;
        var nivelA = false;
        var nivelV = false;

        for (item in symptoms) {
          sintomas.push({
            'nombre': symptoms[item].nombre,
            'nivel': symptoms[item].nivel
          })

          if (symptoms[item].nivel == 'r') {
            nivelEmergencia = 'r';
            nivelR = true;
          }
          if (symptoms[item].nivel == 'n' && !nivelR) {
            nivelEmergencia = 'n';
            nivelN = true;
          }
          if (symptoms[item].nivel == 'a' && !nivelR && !nivelN) {
            nivelEmergencia = 'a';
            nivelA = true;
          }
          if (symptoms[item].nivel == 'v' && !nivelR && !nivelN && !nivelA) {
            nivelEmergencia = 'v';
            nivelV = true;
          }
          if (symptoms[item].nivel == 'az' && !nivelR && !nivelN && !nivelA && !nivelV) {
            nivelEmergencia = 'az';
          }

        }

        // Tiempo dependiendo del nivel de emergencia
        switch (nivelEmergencia) {
          case 'r':
            timeInQueue.setMinutes(timeInQueue.getMinutes());
            break;

          case 'n':
            timeInQueue.setMinutes(timeInQueue.getMinutes() + 10);
            break;

          case 'v':
            timeInQueue.setMinutes(timeInQueue.getMinutes() + 30);
            break;

          case 'a':
            timeInQueue.setMinutes(timeInQueue.getMinutes() + 15);
            break;

          case 'az':
            timeInQueue.setMinutes(timeInQueue.getMinutes() + 30);
            break;
        }

        symptoms = {}
        ;

        symptoms['sintomas'] = sintomas;
        symptoms['requisitos'] = requisitos;

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
            response.fechaNacimiento = new Date(response.fechaNacimiento);
            deferred.resolve(response);
          });

        return deferred.promise;
      }
    }
  }]);
