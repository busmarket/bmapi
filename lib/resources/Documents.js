'use strict';

const ErrorMessages = require('../error_messages/ErrorMessages');
const BmApiError = ErrorMessages.BmApiError;


const URL = '/documents'

function Documents(client) {
    this.get = client.get;
}

Documents.prototype = {

    /**
     * ✅ Группы документов.
     * 🔗 https://developer.bm.parts/api/v2/documents.html#get-documents-filters-groups
     * * Query Parameters (options = {}):
     * ==============================================================================
     * |_____KEY____________|||_isRequired_|||__default___|||__description_
     * ==============================================================================
     * ------------------------------------------------------------------------------
     * ==============================================================================
     *
     */
    filterGroups: function () {
        return this.get(`${URL}/filters/groups`);
    },


    /**
     * ✅ Типы документов.
     * 🔗 https://developer.bm.parts/api/v2/documents.html#get-documents-filters-types
     * * Query Parameters (options = {}):
     * ==============================================================================
     * |_____KEY____________|||_isRequired_|||__default___|||__description_
     * ==============================================================================
     * ------------------------------------------------------------------------------
     * ==============================================================================
     *
     */
    filterTypes: function () {
        return this.get(`${URL}/filters/types`);
    },


    /**
     * ✅ Быстрый выбор дат.
     * 🔗 https://developer.bm.parts/api/v2/documents.html#get-documents-filters-dates
     * * Query Parameters (options = {}):
     * ==============================================================================
     * |_____KEY____________|||_isRequired_|||__default___|||__description_
     * ==============================================================================
     * ------------------------------------------------------------------------------
     * ==============================================================================
     *
     */
    filterDates: function () {
        return this.get(`${URL}/filters/dates`);
    },


    /**
     * ✅ Журнал документов сгруппированный по датам.
     * 🔗 https://developer.bm.parts/api/v2/documents.html#get-documents-grouped
     * * Query Parameters (options = {}):
     * ==============================================================================
     * |_____KEY____________|||_isRequired_|||__default      |||__description_
     * ==============================================================================
     * | direction           | false        | desc            |  Направление сортировки. Может быть asc или desc
     * ------------------------------------------------------------------------------
     * | period              | false        | month           |  Период выборки
     * ------------------------------------------------------------------------------
     * | type                | false        | 'все документы' |  Фильтр по типу документа (code)
     * ------------------------------------------------------------------------------
     * | q                   | false        |                 |  Фильтр по типу документа
     * ------------------------------------------------------------------------------
     * ==============================================================================
     *
     * Допускается фильтрация документов по типу и по номеру. Для документа ТТН фильтрация происходит также по номеру перевозчика.
     *
     */
    filterGrouped: function (options = {}) {
        return this.get(`/documents/grouped`, options);
    },


    /***
     * ✅ Список документов
     * 🔗 https://developer.bm.parts/api/v2/documents.html#get-documents-list
     *
     * * Query Parameters (options = {}):
     * ==============================================================================
     * |_____KEY____________|||_isRequired_|||__default      |||__description_
     * ==============================================================================
     * | direction           | false        | desc            |  Направление сортировки. Может быть asc или desc
     * ------------------------------------------------------------------------------
     * | period              | false        | month           |  Период выборки
     * ------------------------------------------------------------------------------
     * | type                | false        | 'все документы' |  Фильтр по типу документа
     * ------------------------------------------------------------------------------
     * | q                   | false        |                 |  Фильтр по типу документа
     * ------------------------------------------------------------------------------
     * | page                | false        |                 |  Страница выдачи
     * ------------------------------------------------------------------------------
     * | per_page            | false        |                 |  Кол-во элементов в выдаче
     * ------------------------------------------------------------------------------
     * ==============================================================================
     *
     */
    listDocuments: function (options = {}) {
        return this.get(`/documents/list`, options);
    },


    /***
     * ✅ Состояние рекламации
     * 🔗 https://developer.bm.parts/api/v2/documents.html#get-documents-reclamation-string-act-uuid
     *
     * * Query Parameters (options = {}):
     * ==============================================================================
     * |_____KEY____________|||_isRequired_|||__default      |||__description_
     * ==============================================================================
     * | act_uuid            | true         |                 |  ID документа рекламации
     * ------------------------------------------------------------------------------
     * ==============================================================================
     *
     */
    reclamationStatus: function (options = {}) {
        const statusError = BmApiError({
            inputOptions: options,
            requireParameters: ['act_uuid'],
            url: {
                base: URL,
                hash: 'get-trainings-list'
            }
        });
        if (!statusError)
            return this.get(`${URL}/reclamation/${options.act_uuid}`);
    },


    /***
     * ✅ Сохранить документ
     * 🔗 https://developer.bm.parts/api/v2/documents.html#get-documents-download-string-type-string-uuid-string-file-type
     *
     * * Query Parameters (options = {}):
     * ==============================================================================
     * |_____KEY____________|||_isRequired_|||__default      |||__description_
     * ==============================================================================
     * | type                | true         |                 |  Тип документа
     * ------------------------------------------------------------------------------
     * | uuid                | true         |                 |  ID документа
     * ------------------------------------------------------------------------------
     * | file_type           | true         |                 |  Тип файла. Возможны варианты: pdf, xlsx, csv.
     * ------------------------------------------------------------------------------
     * ==============================================================================
     *
     *  Обратите внимание, что не все документы могут быть сохраненые как pdf или xlsx.
     *
     */
    downloadDocument: function (options = {}) {
        const statusError = BmApiError({
            inputOptions: options,
            requireParameters: ['type', 'uuid', 'file_type'],
            url: {
                base: URL,
                hash: 'get-documents-download-string-type-string-uuid-string-file-type'
            }
        });
        if (!statusError)
            return this.get(`${URL}/download/${options.type}/${options.uuid}/${options.file_type}`);
    },


    /***
     * ✅ Получить документ по ссылке
     * 🔗 https://developer.bm.parts/api/v2/documents.html#get-documents-string-type-string-uuid

     * * Query Parameters (options = {}):
     * ==============================================================================
     * |_____KEY____________|||_isRequired_|||__default      |||__description_
     * ==============================================================================
     * | type                | true         |                 |  Тип документа (code)
     * ------------------------------------------------------------------------------
     * | uuid                | true         |                 |  ID документа
     * ------------------------------------------------------------------------------
     * ==============================================================================
     */
    getDocument: function (options = {}) {
        const statusError = BmApiError({
            inputOptions: options,
            requireParameters: ['type', 'uuid'],
            url: {
                base: URL,
                hash: 'get-documents-string-type-string-uuid'
            }
        });
        if (!statusError)
            return this.get(`${URL}/${options.type}${options.uuid}/`);
    }
};

module.exports = Documents;
