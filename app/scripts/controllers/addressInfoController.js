angular.module('dmExplorer')
    .controller('addressInfoCtrl', function ($rootScope, $scope, $location, $routeParams, $q) {

      var web3 = $rootScope.web3;
	
      $scope.init=function(){

        $scope.addressId=$routeParams.addressId;

        if($scope.addressId!==undefined) {
          getAddressInfos().then(function(result){
            $scope.balance = result.balance;
            $scope.balanceInDM = result.balanceInDM;
          });
        }


        function getAddressInfos(){
          var deferred = $q.defer();

          web3.eth.getBalance($scope.addressId,function(error, result) {
            if(!error) {
                deferred.resolve({
                  balance: result,
                  balanceInDM: web3.fromWei(result, 'ether')
                });
            } else {
                deferred.reject(error);
            }
          });
          return deferred.promise;
        }


      };
      
      $scope.init();

    });
