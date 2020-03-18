'use strict';

const ErrorMessages = require('../error_messages/ErrorMessages');
const BmApiError = ErrorMessages.BmApiError;

function Advertising(client) {
    this.get = client.get;
}

const URL = '/advertising';

Advertising.prototype = {


    /**
     * ✅ Получить случайный баннер.
     * 🔗 https://developer.bm.parts/api/v2/advertising.html#get-advertising-banner-random
     * * Query Parameters (options = {}):
     * ==============================================================================
     * |_____KEY____________|||_isRequired_|||__default___|||__description_
     * ==============================================================================
     * | banner_code         |     false     |               |    Тип баннера (busmarket_, app, home, )
     * ------------------------------------------------------------------------------
     * | advert              |     false     |               |    ID Акции
     * ------------------------------------------------------------------------------
     * ==============================================================================
     *
     */
    bannerRandom: function (options = {}) {
        return this.get(`${URL}/banner/random`,options);
    },


    /**
     * ✅ Получить список баннеров.
     * 🔗 https://developer.bm.parts/api/v2/advertising.html#get-advertising-banners
     * * Query Parameters (options = {}):
     * ==============================================================================
     * |_____KEY____________|||_isRequired_|||__default___|||__description_
     * ==============================================================================
     * | banner_code         |     false     |               |    Тип баннера (busmarket_, app, home, )
     * ------------------------------------------------------------------------------
     * | advert              |     false     |               |    ID Акции
     * ------------------------------------------------------------------------------
     * ==============================================================================
     *
     */
    bannersList: function (options = {}) {
        return this.get(`${URL}/banners`,options);
    },


    /**
     * ✅ Получить список акций.
     * 🔗 https://developer.bm.parts/api/v2/advertising.html#get-advertising-list
     * * Query Parameters (options = {}):
     * ==============================================================================
     * |_____KEY____________|||_isRequired_|||__default___|||__description_
     * ==============================================================================
     * | banner_code         |     false     |               |  Тип баннера (busmarket_, app, home, )
     * ------------------------------------------------------------------------------
     * | promo               |     false     |               |  Список ID для фильтрации.
     *                       |               |               |  Пример:?promo=811C005056AC1EA911E853995D337585
     *                       |               |               |         &promo=811C005056AC1EA911E853995D123456
     * ------------------------------------------------------------------------------
     * | public              |     false     |               |  Публичное описание акции
     * ------------------------------------------------------------------------------
     * | filter              |     false     |  current      |  Фильтр по акциям может принимать значения:
     * |                     |               |               |  current, c, all
     * ------------------------------------------------------------------------------
     * | page                |     false     |               |  Страница выдачи
     * ------------------------------------------------------------------------------
     * | per_page            |     false     |               |  Кол-во элементов в выдаче.
     * ------------------------------------------------------------------------------
     * ==============================================================================
     *
     */
    listAdvertisings: function (options = {}) {
        return this.get(`${URL}/list`, options);
    },


    /**
     * ✅ Прогресс акции.
     * 🔗 https://developer.bm.parts/api/v2/advertising.html#get-advertising-promo-promo-uuid-progress
     * * Query Parameters (options = {}):
     * ==============================================================================
     * |_____KEY____________|||_isRequired_|||__default___|||__description_
     * ==============================================================================
     * | promo_uuid          |     true     |              |  ID акции.
     * |                     |              |              |  Чтобы получить прогресс по всем акциям
     * |                     |              |              |  используйте параметр _all
     * ------------------------------------------------------------------------------
     * ==============================================================================
     *
     */
    progress: function (options = {}) {
        const statusError = BmApiError({
            inputOptions: options,
            requireParameters: ['promo_uuid'],
            url: {
                base: URL,
                hash: 'get-advertising-promo-promo-uuid-progress'
            }
        });
        if (!statusError)
            return this.get(`${URL}/promo/${options.promo_uuid}/progress`, options);
    },


    /**
     * ✅ Получить акцию.
     * 🔗 https://developer.bm.parts/api/v2/advertising.html#get-advertising-promo-promo-uuid
     * * Query Parameters (options = {}):
     * ==============================================================================
     * |_____KEY____________|||_isRequired_|||__default___|||__description_
     * ==============================================================================
     * | promo_uuid          |     true     |              |  ID акции.
     * |                     |              |              |  Чтобы получить прогресс по всем акциям
     * |                     |              |              |  используйте параметр _all
     * ------------------------------------------------------------------------------
     * | public              |     true     |              |  Публичное описание акции.
     * |                     |              |              |  Достаточно наличиия параметра без значения
     * ------------------------------------------------------------------------------
     * ==============================================================================
     *
     */
    promo: function (options = {}) {
        const statusError = BmApiError({
            inputOptions: options,
            requireParameters: ['promo_uuid','public'],
            url: {
                base: URL,
                hash: 'get-advertising-promo-promo-uuid'
            }
        });
        if (!statusError)
            return this.get(`${URL}/promo/${options.promo_uuid}`, options);

    },
};

module.exports = Advertising;
