triage
  .controller('registrarPacienteCtrl', ['$location', '$scope', '$rootScope', 'alertService', '$uibModal', 'growl', '$timeout', 'patientService', 'dateService',
    function ($location, $scope, $rootScope, alertService, $uibModal, growl, $timeout, patientService, dateService) {

      //public var
      var vm = this;
      vm.view = "ola";
      vm.parent = $scope.$parent.vm;
      vm.patientInfo = {};

      //public functions
      vm.registerPatient = registerPatient;

      //private functions
      function activate() {


      }

      activate();

      function registerPatient(patientInfo) {

        patientInfo.fechaNacimiento = dateService.getDateFormatWithDiagonals(patientInfo.fechaNacimiento);

        patientService.setPatient(patientInfo);

        vm.patientInfo = {};
        vm.parent.modalRegisterPatient.dismiss();
      }


    }
  ]);
