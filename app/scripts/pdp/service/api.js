(function (define) {
    'use strict';

    /*
     *  HTML top page header manipulation stuff
     */
    define(['pdp/init'], function (pdpModule) {
        pdpModule
            /*
             *  $productApiService interaction service
             */
            .service('$pdpApiService', ['$resource', 'REST_SERVER_URI', function ($resource, REST_SERVER_URI) {

                var pdpBaseURL = REST_SERVER_URI + '/product';

                return $resource(pdpBaseURL, {}, {
                    'getProduct': {
                        method: 'GET',
                        params: { id: '@id' },
                        url: pdpBaseURL + '/get/:id'
                    },
                    'getImagePath': {
                        method: 'GET',
                        params: { productId: '@productId' },
                        url: pdpBaseURL + '/media/path/:productId/image'
                    },
                    'listImages': {
                        method: 'GET',
                        params: { productId: '@productId' },
                        url: pdpBaseURL + '/media/list/:productId/image'
                    },
                    "addRating": {
                        method: "GET",
                        params: {
                            pid: "@pid",
                            stars: "@stars"
                        },
                        url: pdpBaseURL + "/rating/add/:pid/:stars"
                    },
                    "ratingInfo": {
                        method: "GET",
                        params: { pid: "@pid" },
                        url: pdpBaseURL + "/rating/info/:pid"
                    },
                    "addReview": {
                        method: "POST",
                        params: { pid: "@pid" },
                        url: pdpBaseURL + "/review/add/:pid"
                    },
                    "reviewList": {
                        method: "GET",
                        params: { pid: "@pid" },
                        url: pdpBaseURL + "/review/list/:pid"
                    },
                    "reviewRemove": {
                        method: "DELETE",
                        params: { reviewId: "@reviewId" },
                        url: pdpBaseURL + "/review/remove/:reviewId"
                    }
                });
            }]);

        return pdpModule;
    });

})(window.define);
