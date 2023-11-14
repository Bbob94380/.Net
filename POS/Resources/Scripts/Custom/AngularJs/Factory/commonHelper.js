rootModule.factory('commonHelper', function () {
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

        allFuntinos.test = function() {
            console.log("Factory test is successful");
        }

        return allFunctions;

});