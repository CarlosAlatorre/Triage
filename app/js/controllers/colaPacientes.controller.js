/**
 * Created by Toshiba on 14/02/2017.
 */
triage
  .controller('colaPacientesCtrl', ['patientService', '$location', '$scope', '$rootScope', 'alertService', '$uibModal', 'growl', '$timeout', 'chronoService',
    function (patientService, $location, $scope, $rootScope, alertService, $uibModal, growl, $timeout, chronoService) {

      //public var
      var vm = this;
      vm.view = 'informacionBasica';
      vm.patientQueue = {};


      //public functions
      vm.openRegisterPatient = openRegisterPatient;
      vm.openRegisterSymptom = openRegisterSymptom;
      vm.openPatientDetails = openPatientDetails;
      vm.closeModalOfRegisterPatient = closeModalOfRegisterPatient;
      vm.closeModalofRegisterSymptom = closeModalofRegisterSymptom;
      vm.nextInModalOfRegisterSymptom = nextInModalOfRegisterSymptom;
      vm.closeModalPatientDetails = closeModalPatientDetails;

      //private functions
      function activate() {

        patientService.getPatientQueue().then(function(response){
          vm.patientQueue = response;
        });
        var date = new Date();
        date.setMinutes(date.getMinutes() + 10)
        var newDate = new Date();

        var i = date.toString();
        var y = newDate.toString();

        console.log(i);
        console.log(y);

        var d1 = new Date(i);
        var d2 = new Date(y);

        console.log((d1 - d2)*0.001);
        console.log(date , newDate)
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
        vm.modalRegisterSymptom = $uibModal.open({
          animation: true,
          templateUrl: 'views/modals/registrarSintomas.modal.html',
          scope: $scope,
          size: 'lm',
          backdrop: 'static'
        });
      }

      function openPatientDetails() {
        vm.modalPatientDetails = $uibModal.open({
          animation: true,
          templateUrl: 'views/modals/pacienteDetalles.modal.html',
          scope: $scope,
          size: 'lm',
          backdrop: 'static'
        });
      }

      function closeModalOfRegisterPatient() {

        vm.modalRegisterPatient.dismiss();

      }

      function closeModalPatientDetails() {

        vm.modalPatientDetails.dismiss();

      }

      function closeModalofRegisterSymptom() {

+
        vm.modalRegisterSymptom.dismiss();
      }

      function nextInModalOfRegisterSymptom() {


        vm.modalRegisterSymptom.dismiss();
      }


    }
  ]);
