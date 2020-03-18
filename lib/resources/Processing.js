'use strict';

const ErrorMessages = require('../error_messages/ErrorMessages');
const BmApiError = ErrorMessages.BmApiError;

function Processing(client) {
    this.get = client.get;
    this.post = client.post;
}

const URL = '/processing';


Processing.prototype = {

    /**
     * ✅ Отгрузить зарезервированные заказы (синхронно).
     * 🔗 https://developer.bm.parts/api/v2/processing.html#post-processing-reserve-process
     *
     * * Query Parameters (options = {}):
     * ==============================================================================
     * |_____KEY____________|||_isRequired_|||__default___|||__description_
     * ==============================================================================
     * | orders_array        |     true     |               |    Массив заказов
     * ------------------------------------------------------------------------------
     * | delivery_config     |     true     |               |    ID настройки доставки
     * ------------------------------------------------------------------------------
     * | warehouse           |     true     |               |    ID склада с которого отгружать корзину
     * ------------------------------------------------------------------------------
     * | key                 |     true     |               |    Ключ
     * ------------------------------------------------------------------------------
     * | expired_at          |     true     |               |    Время жизни ключа
     * ------------------------------------------------------------------------------
     * | route_code          |     true     |               |    Код рейса
     * ------------------------------------------------------------------------------
     * | route_at            |     true     |               |    Дата и время рейса
     * ------------------------------------------------------------------------------
     * | departure_at        |     true     |               |    Время выезда курьера со склада
     * ------------------------------------------------------------------------------
     * | comment             |     true     |               |    Комментарий к отгрузке
     * ------------------------------------------------------------------------------
     * ==============================================================================
     *
     * ⚠ Предупреждение:
     * Метод выполняет синхронную отгрузку резерва, таймаут по данному запросу может составлять до 30 сек.
     */
    reserveProcess: function (options = {}) {
        const statusError = BmApiError({
            inputOptions: options,
            requireParameters: ['orders_array', 'delivery_config', 'warehouse', 'key', 'key', 'expired_at', 'route_code', 'route_at', 'departure_at', 'comment'],
            url: {
                base: URL,
                hash: 'post-processing-reserve-process'
            }
        });
        if (!statusError)
            return this.post(`${URL}/reserve/process`, {...options});
    },

    /**
     * ✅ Получить список доступных выездов.
     * 🔗 https://developer.bm.parts/api/v2/processing.html#get-processing-departures
     *
     * * Query Parameters (options = {}):
     * ==============================================================================
     * |_____KEY____________|||_isRequired_|||__default___|||__description_
     * ==============================================================================
     * | delivery_config     |     true     |               |    ID настройки доставки
     * ------------------------------------------------------------------------------
     * | warehouse           |     true     |               |    ID склада
     * ------------------------------------------------------------------------------
     * ==============================================================================
     *
     */
    getDepartures: function (options = {}) {
        const statusError = BmApiError({
            inputOptions: options,
            requireParameters: ['delivery_config', 'warehouse'],
            url: {
                base: URL,
                hash: 'post-processing-reserve-process'
            }
        });
        if (!statusError)
            return this.get(`${URL}/departures`, options);
    },

    /**
     * ✅ Отгрузить корзину (синхронно).
     * 🔗 https://developer.bm.parts/api/v2/processing.html#post-processing-sync
     *
     * * Query Parameters (options = {}):
     * ==============================================================================
     * |_____KEY____________|||_isRequired_|||__default___|||__description_
     * ==============================================================================
     * | cart                |     true     |               |    ID корзины
     * ------------------------------------------------------------------------------
     * | delivery_config     |     true     |               |    ID настройки доставки
     * ------------------------------------------------------------------------------
     * | warehouse           |     true     |               |    ID склада с которого отгружать корзину
     * ------------------------------------------------------------------------------
     * | key                 |     true     |               |    Ключ
     * ------------------------------------------------------------------------------
     * | expired_at          |     true     |               |    Время жизни ключа
     * ------------------------------------------------------------------------------
     * | route_code          |     true     |               |    Код рейса
     * ------------------------------------------------------------------------------
     * | route_at            |     true     |               |    Дата и время рейса
     * ------------------------------------------------------------------------------
     * | departure_at        |     true     |               |    Время выезда курьера со склада
     * ------------------------------------------------------------------------------
     * | comment             |     true     |               |    Комментарий к отгрузке
     * ------------------------------------------------------------------------------
     * | save_unprocessed    |     true     |               |    Сохранять неотгруженные товары. По умолчанию, нет
     * ------------------------------------------------------------------------------
     * ==============================================================================
     *
     * ⚠ Предупреждение:
     * Метод выполняет синхронную отгрузку резерва, таймаут по данному запросу может составлять до 30 сек.
     */
    processSync: function (options = {}) {
        const statusError = BmApiError({
            inputOptions: options,
            requireParameters: ['cart', 'delivery_config', 'warehouse', 'key', 'key', 'expired_at', 'route_code', 'route_at', 'departure_at', 'comment', 'save_unprocessed'],
            url: {
                base: URL,
                hash: 'post-processing-reserve-process'
            }
        });
        if (!statusError)
            return this.post(`${URL}/sync`, {...options});
    },

    /**
     * ✅ Excel из неотгруженных товаров.
     * 🔗 https://developer.bm.parts/api/v2/processing.html#excel
     *
     * * Query Parameters (options = {}):
     * ==============================================================================
     * |_____KEY____________|||_isRequired_|||__default___|||__description_
     * ==============================================================================
     * | task_id             |     false     |               |
     * ------------------------------------------------------------------------------
     * ==============================================================================
     *
     */
    downloadUnshipped: function (options = {}) {
        return this.get(`${URL}/download/unshipped${options.task_id ? '/' + options.task_id : ''}`);
    },

    /**
     * ✅ Проверить доступность отгрузки корзины.
     * 🔗 https://developer.bm.parts/api/v2/processing.html#get-processing-cart-string-cart-uuid-pre-check
     *
     * * Query Parameters (options = {}):
     * ==============================================================================
     * |_____KEY____________|||_isRequired_|||__default___|||__description_
     * ==============================================================================
     * | cart_uuid           |     true     |               |    ID Корзины
     * ------------------------------------------------------------------------------
     * ==============================================================================
     *
     */
    cartPreCheck: function (options = {}) {
        const statusError = BmApiError({
            inputOptions: options,
            requireParameters: ['cart_uuid'],
            url: {
                base: URL,
                hash: 'post-processing-reserve-process'
            }
        });
        if (!statusError)
            return this.get(`${URL}/cart/${options.cart_uuid}/pre_check`);
    },

    /**
     * ✅ Проверка результатов асинхронной отгрузки.
     * 🔗 https://developer.bm.parts/api/v2/processing.html#get-processing-shipment-task-id
     *
     * * Query Parameters (options = {}):
     * ==============================================================================
     * |_____KEY____________|||_isRequired_|||__default___|||__description_
     * ==============================================================================
     * | task_id             |     true     |               |
     * ------------------------------------------------------------------------------
     * ==============================================================================
     *
     */
    checkShipmentStatus: function (options = {}) {
        const statusError = BmApiError({
            inputOptions: options,
            requireParameters: ['task_id'],
            url: {
                base: URL,
                hash: 'post-processing-reserve-process'
            }
        });
        if (!statusError)
            return this.get(`${URL}/shipment/${options.task_id}`);
    },


};

module.exports = Processing;
