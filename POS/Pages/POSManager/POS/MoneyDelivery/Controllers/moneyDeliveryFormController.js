
rootModule.controller("moneyDeliveryFormController", ["$scope", "$location", "$stateParams", "$uibModal", "$http", "$rootScope", "$filter", "filterTableListService", "commonHelper", function ($scope, $location, $stateParams, $uibModal, $http, $rootScope, $filter, filterTableListService, $common_helper) {

    $scope.LBP_VALUES = [
        "100000", "50000", "20000", "10000", "5000", "1000"
    ];
    $scope.USD_VALUES = [
        "100", "50", "20", "10", "5", "1"
    ];

    $scope.LBP_TOTAL = 0;
    $scope.USD_TOTAL = 0;

    $scope.imagesList = [];

    $scope.handleLBPOnBlur = function () {
        $scope.LBP_TOTAL = 0;
        $(".LBP_INPUT").each((index, element) => {
            fiat_count = parseInt(element.value);
            fiat_weight = parseInt(element.getAttribute("weight"));
            if (fiat_count < 0) {
                element.value = 0;
                fiat_count = 0;
            }
            $scope.LBP_TOTAL += (fiat_weight * fiat_count);
        });
    }
    $scope.handleUSDOnBlur = function () {
        $scope.USD_TOTAL = 0;
        $(".USD_INPUT").each((index, element) => {
            fiat_count = parseInt(element.value);
            fiat_weight = parseInt(element.getAttribute("weight"));
            if (fiat_count < 0) {
                element.value = 0;
                fiat_count = 0;
            }
            $scope.USD_TOTAL += (fiat_weight * fiat_count);
        });
    }

    $scope.handleUserInteraction = function () {
        console.log("User interacted");
        handleUSDOnBlur();
        handleLBPOnBlur();
    }

    // My Code Ends 
   

    $scope.attachments = [
        { "id": 1, "type": "Mobile", "name": "attachment1", "ngModelName": "attachment1", "ngModelFileName": "attachmentFile1" },
        { "id": 2, "type": "Mobile", "name": "attachment2", "ngModelName": "attachment2", "ngModelFileName": "attachmentFile2" }
    ];
    $scope.nextIndex = $scope.attachments.length + 1;

    $scope.addNewAttachment = function () {
        $scope.attachments.push({
            'id': $scope.nextIndex,
            "type": "Mobile",
            "name": "attachment" + $scope.nextIndex,
            "ngModelName": "attachment" + $scope.nextIndex,
            "ngModelFileName": "attachmentFile" + $scope.nextIndex
        });
    };

    $scope.removeAttachment = function (id) {
        var index = -1;
        var comArr = eval($scope.attachments);
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].id === id) {
                index = i;
                break;
            }
        }
        $scope.attachments.splice(index, 1);
    };

    $scope.craeteMoneyDelivey = function () {

        var usd_amounts = {};
        var lbp_amounts = {};
        $(".USD_INPUT").each((index, element) => {
            fiat_count = parseInt(element.value);
            fiat_weight = parseInt(element.getAttribute("weight"));
            usd_amounts[fiat_weight] = fiat_count
        });
        $(".LBP_INPUT").each((index, element) => {
            fiat_count = parseInt(element.value);
            fiat_weight = parseInt(element.getAttribute("weight"));
            lbp_amounts[fiat_weight] = fiat_count
        });
        /*attachments = [];*/
        /*$(".attachment").each(index, element)*/
        data = {
            "craetor": "admin@gsm.com",
            "collectorName": $scope.collectorName,
            "collectorMobile": $scope.collectorMobile,
            "bankName": $scope.bankName,
            "bankAddress": $scope.bankAddress,
            "usd_Amounts": usd_amounts,
            "lbp_Amounts": lbp_amounts,
            "totalLbp": $scope.LBP_TOTAL,
            "totalUsd": $scope.USD_TOTAL,
            "files": $scope.imagesList
        }
        console.log("data to be created: ");
        console.log(data);
        $common_helper.createRequest("POST", "/FPOS/rest/moneyDeliv/create", data).then(function (response) {
            console.log("Response: ", response);
        });
    }

    $scope.uploadFile = function (files, id) {
        var base64 = getBase64(files[0], id);
        console.log(base64);
    };


    function getBase64(file, index) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {

            base64String = reader.result.replace("data:", "").replace(/^.+,/, "");

            var imgObj = {
                fileName: file.name,
                size: file.size,
                contentType: file.type,
                description: $scope.Decription, // TODO: use a dyamic ng model: attachment1, attachment2, ... ($scope.("attachment"+index) .. something like that)
                base64encoded: base64String,
                url: "URL_HERE", // TODO: Add a url, where to get it?,
                attachmenttype: "attachementtype" // TODO: add attachment type ("FILE" or "IMAGE")
            }

            $scope.imagesList[index] = imgObj;

            console.log($scope.imagesList);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };
}]);