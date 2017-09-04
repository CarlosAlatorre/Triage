triage
  .config(function ($stateProvider, $urlRouterProvider) {
    //Con urlRouteProvider declaras la ruta por defecto del ui-view o
    //te redigige aqui cuando escriben una ruta invalida
    //$urlRouterProvider.otherwise("/pages/home/home-vistos");
    $urlRouterProvider.otherwise("/colaPacientes");

    //En cada state declaras las diferentes rutas con sus vistas correspondientes, tambien
    //puedes declarar sus controladores, por ejemplo "controller: 'CtrlPrueba as vm' "
    $stateProvider

      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'loginCtrl as vm'
      })

      .state('colaPacientes', {
        url: '/colaPacientes',
        templateUrl: 'views/colaPacientes.html',
        controller: 'colaPacientesCtrl as vm'
      })


    //Produccion
    var config = {
      apiKey: "AIzaSyANsd9wbAfio-ORwiGfSYZHuE5-NwtAp20",
      authDomain: "triage-9a0c0.firebaseapp.com",
      databaseURL: "https://triage-9a0c0.firebaseio.com",
      projectId: "triage-9a0c0",
      storageBucket: "triage-9a0c0.appspot.com",
      messagingSenderId: "945309000606"
    };

    firebase.initializeApp(config);

  });

triage.config(['growlProvider', function (growlProvider) {
  growlProvider.globalTimeToLive(5000);
  growlProvider.globalPosition('bottom-right');
}]);
