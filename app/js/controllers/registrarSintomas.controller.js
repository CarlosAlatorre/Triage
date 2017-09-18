triage
  .controller('registrarSintomasCtrl', ['$location', '$scope', '$rootScope', 'alertService', '$uibModal', '$timeout', 'patientService', 'dateService',
    function ($location, $scope, $rootScope, alertService, $uibModal, $timeout, patientService, dateService) {

      //public var
      var vm = this;
      vm.symptoms = [];
      vm.patientInfo = {};
      vm.parent = $scope.$parent.vm;
      vm.view = 'informacionBasica';


      //public functions
      vm.nextInModalOfRegisterSymptom = nextInModalOfRegisterSymptom;
      vm.closeModalofRegisterSymptom = closeModalofRegisterSymptom;
      vm.addOrDeleteItemInAssignment = addOrDeleteItemInAssignment;
      vm.verifyChecked = verifyChecked;

      //private functions
      function activate() {

        patientService.getPatient(vm.parent.patientKey).then(function (response) {
          vm.patientInfo = response;
        })

      }

      activate();

      function nextInModalOfRegisterSymptom(view) {
        switch (view){

          case 'informacionBasica':
            vm.view = 'sintomas';
            break;

          case 'sintomas':
            vm.view = 'vistaPrevia';
            break;

          case 'vistaPrevia':
            patientService.addPatientToTheQueue(vm.patientInfo, vm.symptoms);
            vm.parent.growl.success('Paciente agregado a la cola!', vm.parent.config);
            vm.parent.patientKey = '';
            vm.parent.modalRegisterSymptom.dismiss();
            break;

        }
      }

      function closeModalofRegisterSymptom() {

        vm.parent.patientKey = '';
        vm.parent.modalRegisterSymptom.dismiss();
      }

      function addOrDeleteItemInAssignment(requisito) {
        //noinspection JSDuplicatedDeclaration
        var symptomIndex = _.findIndex(vm.symptoms, {'nombre' : requisito});

        if(symptomIndex == -1){
          vm.symptoms.push({
            nombre: requisito
          })
        }else{
          vm.symptoms.splice(symptomIndex, 1);

        }
      }

      function verifyChecked(requisito) {
        var checked;

        checked =_.findIndex(vm.symptoms, {'nombre' : requisito});

        return checked;
      }


    }
  ]);
