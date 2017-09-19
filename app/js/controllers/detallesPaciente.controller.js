triage
  .controller('detallesPacienteCtrl', ['$location', '$scope', '$rootScope', 'alertService', '$uibModal', 'growl', '$timeout', 'patientService', 'dateService',
    function ($location, $scope, $rootScope, alertService, $uibModal, growl, $timeout, patientService, dateService) {

      //public var
      var vm = this;
      vm.parent = $scope.$parent.vm;
      vm.patientInfo = {};
      vm.patientSymptoms = {};


      //public functions
      vm.closeModalPatientDetails = closeModalPatientDetails;
      vm.getBirthDay = getBirthDay;


      //private functions
      function activate() {

        patientService.getPatientInQueue(vm.parent.patientQueueKey).then(function (response) {
          vm.patientSymptoms = response;

          patientService.getPatient(response.claveSeguro).then(function (responsePatientInfo) {
            vm.patientInfo = responsePatientInfo;
          })
        })

      }

      activate();

      function closeModalPatientDetails() {

        vm.parent.modalPatientDetails.dismiss();

      }

      function getBirthDay(date) {
        return dateService.getDateFormatWithDiagonals(date);
      }

    }
  ]);
