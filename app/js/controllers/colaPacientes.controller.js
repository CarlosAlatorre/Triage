/**
 * Created by Toshiba on 14/02/2017.
 */
triage
  .controller('colaPacientesCtrl', ['$location', '$scope', '$rootScope', 'alertService', '$uibModal', 'growl', '$timeout', 'chronoService',
    function ($location, $scope, $rootScope, alertService, $uibModal, growl, $timeout, chronoService) {

      //public var
      var vm = this;
      vm.view = 'informacionBasica';


      //public functions
      vm.openRegisterPatient = openRegisterPatient;
      vm.openRegisterSymptom = openRegisterSymptom;
      vm.registerPatient = registerPatient;
      vm.closeModalOfRegisterPatient = closeModalOfRegisterPatient;
      vm.closeModalofRegisterSymptom = closeModalofRegisterSymptom;
      vm.nextInModalOfRegisterSymptom = nextInModalOfRegisterSymptom;


      //private functions
      function activate() {


      }

      activate();

      function openRegisterPatient() {
        vm.modalRegisterPatient = $uibModal.open({
          animation: true,
          templateUrl: 'views/modals/registrarPaciente.modal.html',
          scope: $scope,
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

      function registerPatient(patient) {

        vm.modalRegisterPatient.dismiss();
      }

      function closeModalOfRegisterPatient() {

        vm.modalRegisterPatient.dismiss();

      }

      function closeModalofRegisterSymptom() {


        vm.modalRegisterSymptom.dismiss();
      }

      function nextInModalOfRegisterSymptom() {


        vm.modalRegisterSymptom.dismiss();
      }


    }
  ]);
