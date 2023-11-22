rootModule.factory('commonHelper', ["$http", function ($http) {
        var allFunctions = {};


        allFunctions.getWOP = function (itemObject) {

            var isCashPaid = false;
            var isCardPaid = false;

            if ((itemObject.cachAmountMc !== 0 && itemObject.cachAmountMc !== null) ||
                (itemObject.cachAmountSc !== 0 && itemObject.cachAmountSc !== 0)) {

                isCashPaid = true;
            }

            if ((itemObject.firstCardTypeAmount !== 0 && $scope.refundItem.firstCardTypeAmount !== null) ||
                (itemObject.secondCardTypeAmount !== 0 && $scope.refundItem.secondCardTypeAmount !== 0)) {

                isCardPaid = true;
            }

            if (isCardPaid && isCashPaid) {
                itemObject.wop = "Cash and card";
            } else if (isCardPaid) {
                itemObject.wop = "Card";
            } else if (isCashPaid) {
                itemObject.wop = "Cash";
            } else {
                itemObject.wop = "";
            }

        }

        allFunctions.test = function() {
            console.log("Factory test is successful");
        }

    //allFunctions.createRequest = function (method, url, data = {}) {
    //    return $http({
    //        method: method,
    //        url: "http://35.181.42.111:8080" + url,
    //        withCredentials: true,
    //        dataType: "json",
    //        headers: {
    //            "Access-Control-Allow-Origin": "http://itcherry-001-site7.atempurl.com/",
    //            'Content-Type': 'application/json'
    //        },
    //        data: data
    //    });
    //}

    allFunctions.createRequest = function (method, url, data = {}) {
        return $http({
            method: method,
            url: "http://localhost:8080" + url,
            withCredentials: true,
            dataType: "json",
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:44346",
                'Content-Type': 'application/json'
            },
            data: data
        });
    }
        return allFunctions;

}]);