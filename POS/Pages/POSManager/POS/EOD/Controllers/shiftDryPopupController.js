
rootModule.controller('shiftDryPopupController', function ($scope, $uibModalInstance, data, $uibModal) {

    $scope.shiftObj = data.shiftObj;
    $scope.creationDate = data.creationDate;
    $scope.creationTime = data.creationTime;
    $scope.eodId = data.eodId;
    $scope.shiftNumber = data.shiftNumber;

    $scope.sumDryAndStation = [];

    for (var i = 0; i < $scope.shiftObj.employeeDryProductSummaries; i++) {

        var emp = $scope.shiftObj.employeeDryProductSummaries[i].employeeId;

        for (var j = 0; j < $scope.shiftObj.employeeStationServiceSummaries; j++) {

            if (emp === $scope.shiftObj.employeeStationServiceSummaries[j].employeeId) {
                var obj = {
                    employeeName: $scope.shiftObj.employeeDryProductSummaries[i].employeeName,
                    quantity: $scope.shiftObj.employeeDryProductSummaries[i].quantity,
                    totalLbp: $scope.shiftObj.employeeDryProductSummaries[i].totalLbp,
                    totalUsd: $scope.shiftObj.employeeDryProductSummaries[i].totalUsd,
                    numberOfStationServices: $scope.shiftObj.employeeStationServiceSummaries[j].numberOfStationServices,
                    stationServicesTotalLbp: $scope.shiftObj.employeeStationServiceSummaries[j].stationServicesTotalLbp,
                    stationServicesTotalUsd: $scope.shiftObj.employeeStationServiceSummaries[j].stationServicesTotalUsd,
                }
                $scope.sumDryAndStation.push(obj);
                break;
            }
        }
    }

    $scope.goToCarWashShift = function () {

        $uibModalInstance.close($scope.shiftNumber);

    }
 
});