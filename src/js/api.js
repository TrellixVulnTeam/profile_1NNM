'use strict';

angular.module('oos')
    .factory('lastInfoApi', ['$rootScope', '$http','$q', function ($rootScope, $http, $q) {
        function callbackFn(callback) {
            return function (res) {
                if (res.status < 200 || res.status >= 300) {
                    return callback(res);
                }
                if (!res.data) {
                    callback({message: 'no data!'});
                }
                return callback(null, res.data);
            };
        };

        var currency = '';

        /* Bithumb 거래소 마지막 거래 정보 */
        function lastDeals(callback, currency) {
            var rest = 'https://api.bithumb.com/public/ticker/' + currency;
            var req = {
                method : "GET",
                url : rest
            };
            $http(req).then(callbackFn(callback));
        };

        /* Bithumb 거래소 체결 완료 내역 */
        function compleCurrency(callback,currency){
            var rest = 'https://api.bithumb.com/public/recent_transactions/' + currency;
            var req = {
                method : "GET",
                url : rest,
                params : {
                    count: 1
                }
            };
            $http(req).then(callbackFn(callback))
        };

        return {
            lastDeals : lastDeals,
            compleCurrency : compleCurrency
        }
    }])
