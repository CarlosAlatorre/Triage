/**
 * Created by Toshiba on 14/02/2017.
 */
triage
  .controller('colaPacientesCtrl', ['patientService', '$location', '$scope', '$rootScope', 'alertService', '$uibModal', 'growl', '$timeout', 'chronoService',
    function (patientService, $location, $scope, $rootScope, alertService, $uibModal, growl, $timeout, chronoService) {

      //public var
      var vm = this;
      vm.patientQueue = {};
      vm.patientKey = 13330414;
      vm.growl = growl;
      vm.config = {};
      vm.patientQueueKey = '';

      //public functions
      vm.openRegisterPatient = openRegisterPatient;
      vm.openRegisterSymptom = openRegisterSymptom;
      vm.openPatientDetails = openPatientDetails;
      vm.closeModalOfRegisterPatient = closeModalOfRegisterPatient;
      vm.getEmergencyColor = getEmergencyColor;

      vm.registrarSintoma = registrarSintoma;

      //private functions
      function activate() {

        getQueue();

      }

      activate();

      function openRegisterPatient() {

        vm.modalRegisterPatient = $uibModal.open({
          animation: true,
          templateUrl: 'views/modals/registrarPaciente.modal.html',
          scope: $scope,
          controller: "registrarPacienteCtrl as vm",
          size: 'lm',
          backdrop: 'static'
        });
      }

      function openRegisterSymptom() {

        if(vm.patientKey != '') {

          vm.modalRegisterSymptom = $uibModal.open({
            animation: true,
            templateUrl: 'views/modals/registrarSintomas.modal.html',
            scope: $scope,
            controller: "registrarSintomasCtrl as vm",
            size: 'lm',
            backdrop: 'static'
          });
        }else{
          alertService.error('Error al registrar paciente', 'Introduzca primero el numero de clave del paciente')
        }
      }

      function openPatientDetails(patientQueueKey) {
        vm.patientQueueKey = patientQueueKey;

        vm.modalPatientDetails = $uibModal.open({
          animation: true,
          templateUrl: 'views/modals/pacienteDetalles.modal.html',
          scope: $scope,
          controller: "detallesPacienteCtrl as vm",
          size: 'lm',
          backdrop: 'static'
        });
      }

      function closeModalOfRegisterPatient() {

        vm.modalRegisterPatient.dismiss();

      }

      function getQueue() {
        firebase.database().ref('Hospital/colaPacientes')
          .on('value', function (DataSnapshot) {

            vm.patientQueue = DataSnapshot.val();
            $rootScope.$applyAsync();

          })
      }

      function registrarSintoma(sintoma) {
        firebase.database().ref('sintomas').push(sintoma)
      }

      function getEmergencyColor(emergency) {

        color = 'background-color: #2ecc71';

        switch (emergency){

          case 'r':
            return 'background-color: #e74c3c;';
            break;

          case 'n':
            return 'background-color: #e67e22;';
            break;

          case 'a':
            return 'background-color: #f1c40f;';
            break;

          case 'v':
            return 'background-color: #2ecc71;';
            break;

          case 'az':
            return 'background-color: #3498db;';
            break;

        }

      }

    }
  ]);
