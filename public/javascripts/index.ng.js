
(function(){//IIFE BEGIN
var indexNgApp = angular.module('indexNgApp', ['ngRoute']);

indexNgApp.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/listing/:jobId', {
    template: '',
    controller: function($scope, $routeParams, $location, $timeout, $anchorScroll){
      $scope.elem = angular.element("a[href='" + "#" + $routeParams.jobId + "-panel']");
      if ($scope.elem === null || $scope.elem === undefined || $scope.elem.length <= 0){
        alert('Listing (' + $routeParams.jobId + ') not found!');
        $location.path('/');
        return;
      }

      $timeout(function(){
            /*
              Why in here? See (6/5/2015): https://docs.angularjs.org/error/$rootScope/inprog/#triggering-events-programmatically
            */
            $scope.elem.trigger('click');
          },
        0, false);

      var theJobId = $routeParams.jobId;

      $timeout(function(){
          /*
            Why in here? See (6/5/2015): https://docs.angularjs.org/error/$rootScope/inprog/#triggering-events-programmatically
          */
          $location.path('/').hash(theJobId);
          $anchorScroll();
        }, 0, false

      );
    } 
  })
  .otherwise({
    redirectTo: '/'
  });
}]);

indexNgApp.controller('ListingsController', ['$log', '$location', function($log, $location){
  var self = this;

  self.emailAddr = 'jobs@meanstack.org';
  self.getMailToString = function(jobTitle, jobId){
    var mailToString = self.emailAddr + "?subject=Pursuing Job: " +  jobTitle + ", (ID: " +
      jobId + ")&body=To Whom It May Concern:\n\nI am interested in pursuing the \"" + jobTitle +
      "\" opportunity listed on your web site! I have included my contact information below:\n\n" +
      "Phone: <recommended>\nEmail: <if different from current>\nLinkedIn Profile: <recommended>\n" + 
      "Resume: <recommended, url or attached, PDF recommended>\n" +
      "Twitter: <optional>\nGithub: <optional>\nWeb Site or Portfolio: <optional>" + 
      "\n\nListing: " + $location.absUrl() + "listing/" +  jobId;

    return encodeURI(mailToString);
  };

}]);

})();//IIFE END