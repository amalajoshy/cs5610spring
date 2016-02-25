/**
 * Created by amala on 24/02/16.
 */
(function () {
    "use strict";
    /*global angular*/
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var services2 = {
            forms : [{"_id": "000", "title": "Contacts", "userId": 123},
                    {"_id": "010", "title": "ToDo", "userId": 123},
                    {"_id": "020", "title": "CDs", "userId": 234}],
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            getAllForms: getAllForms
        };
        return services2;

        function getAllForms() {
            return services2.forms;
        }

        function createFormForUser(userId, form, callback){
            var new_form = {
                _id: (new Date()).getTime(),
                title: form.title,
                userId: userId
            };
            services2.forms.push(new_form);
            callback(new_form);
            return new_form;

        }
        function findAllFormsForUser(userId, callback){
            var userForms = [];
            for (var u in services2.forms) {
                if (services2.forms[u].userId === userId) {
                    userForms.push(services2.forms[u]);
                }
            }
            callback(userForms);
            return userForms;

        }
        function deleteFormById(formId, callback){
            for (var u in services2.forms) {
                if (services2.forms[u]._id === formId) {
                    services2.forms.splice(u, 1);
                }
            }
            callback(forms);
        }
        function updateFormById(formId, newForm, callback){
            for (var u in services2.forms) {
                if (services2.forms[u]._id === formId) {
                    services2.forms[u].title = newForm.title;
                    services2.forms[u].userId = newForm.userId;
                    callback(services2.forms[u]);
                    return services2.forms[u];
                }
                else
                    callback(null);
                    return null;
            }
        }


    }
})

