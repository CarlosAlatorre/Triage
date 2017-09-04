/**
 * Created by Toshiba on 14/02/2017.
 */
triage
  .controller('colaPacientesCtrl', ['$location', '$scope', '$rootScope', 'alertService', '$uibModal', 'growl', '$timeout', 'chronoService',
    function ($location, $scope, $rootScope, alertService, $uibModal, growl, $timeout, chronoService) {

      //public var
      var vm = this;


      //public functions
      vm.openRegisterPatient = openRegisterPatient;


      //private functions
      function activate() {
        $scope.time =15;
        chronoService.addTimer('myTimer', { interval: 500 });
        chronoService.start();
      }
      activate();

      function openRegisterPatient () {
        vm.modal = $uibModal.open({
          animation: true,
          templateUrl: 'views/modals/registrarPaciente.modal.html',
          scope: $scope,
          size: 'lm',
          backdrop: 'static'
        });
      }


    }
  ]);
