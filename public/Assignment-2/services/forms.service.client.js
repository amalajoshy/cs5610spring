/**
 * Created by amala on 24/02/16.
 */
(function () {
    'use strict';
    /*global angular*/
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($rootScope) {
        var services = {
            forms : [{"f_id": "000", "title": "Contacts", "userId": 123},
                    {"f_id": "010", "title": "ToDo", "userId": 123},
                    {"f_id": "020", "title": "CDs", "userId": 234}],

            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            getAllForms: getAllForms,
            getFormId: getFormId
        };
        return services;

        function getFormId(form) {
            for (var u in services.forms) {
                if (services.forms[u].f_id === form.f_id) {
                    return services.forms[u].f_id;
                }
            }
        }
        function getAllForms() {
            return services.forms;
        }

        function createFormForUser(userId, form, callback) {
            var new_form = {
                f_id: (new Date()).getTime(),
                title: form.title,
                userId: userId
            };
            services.forms.push(new_form);
            callback(new_form);
            return new_form;

        }
        function findAllFormsForUser(userId, callback) {
            var userForms = [];
            for (var u in services.forms) {
                if (services.forms[u].userId === userId) {
                    userForms.push(services.forms[u]);
                }
            }
            callback(userForms);
            return userForms;

        }
        function deleteFormById(formId, callback){
            for (var u in services.forms) {
                if (services.forms[u].f_id === formId) {
                    services.forms.splice(u, 1);
                }
            }
            callback(service.forms);
            return service.forms;
        }
        function updateFormById(formId, newForm, callback){
            for (var u in services.forms) {
                if (services.forms[u].f_id === formId) {
                    services.forms[u].title = newForm.title;
                    services.forms[u].userId = newForm.userId;
                    callback(services.forms[u]);
                    return services.forms[u];
                }
            }
            callback(null);
            return null;
        }


    }
})();

