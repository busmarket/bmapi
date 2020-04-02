'use strict';

const ErrorMessages = require('../error_messages/ErrorMessages');
const BmApiError = ErrorMessages.BmApiError;

function Aggregations(client) {
    this.get = client.get;
}

const URL = 'search/products/aggregations';

Aggregations.prototype = {

    /**
     * ✅ Агрегация по акциям.
     * 🔗 https://developer.bm.parts/api/v2/search_products.html#get-search-products-aggregations-advertisements
     */
    advertisements: function (options = {}) {
        return this.get(`${URL}/advertisements`, options);
    },

    /**
     * ✅ Агрегация по брендам.
     * 🔗 https://developer.bm.parts/api/v2/search_products.html#get-search-products-aggregations-brands
     */
    brands: function (options = {}) {
        return this.get(`${URL}/brands`, options);
    },


    /**
     * ✅ Агрегация по сборочным узлам.
     * 🔗 https://developer.bm.parts/api/v2/search_products.html#get-search-products-aggregations-nodes
     */
    nodes: function (options = {}) {
        return this.get(`${URL}/nodes`, options);
    },


    /**
     * ✅ Агрегация по автомобильным брендам.
     * 🔗 https://developer.bm.parts/api/v2/search_products.html#get-search-products-aggregations-cars
     */
    cars: function (options = {}) {
        return this.get(`${URL}/cars`, options);
    },


    /**
     * ✅ Агрегация по моделям для марки автомобиля.
     * 🔗 https://developer.bm.parts/api/v2/search_products.html#get-search-products-aggregations-car-string-car-name-models
     */
    models: function (options = {}) {
        const statusError = BmApiError({
            inputOptions: options,
            requireParameters: ['car_name'],
            url: {
                base: 'search_products',
                hash: 'post-trainings-register'
            }
        });
        if (!statusError)
            return this.get(`${URL}/car/${options.car_name}/models`, options);
    },


    /**
     * ✅ Агрегация по двигателям для модели.
     * 🔗 https://developer.bm.parts/api/v2/search_products.html#get-search-products-aggregations-car-string-car-name-model-string-model-name
     */
    engines: function (options = {}) {
        const statusError = BmApiError({
            inputOptions: options,
            requireParameters: ['car_name', 'model_name'],
            url: {
                base: 'search_products',
                hash: 'get-search-products-aggregations-car-string-car-name-model-string-model-name'
            }
        });
        if (!statusError)
            return this.get(`search/products/aggregations/car/${options.car_name}/model/${options.model_name}`);

    },

};

module.exports = Aggregations;
