/**
 * Created by amala on 24/02/16.
 */
(function () {
    'use strict';
    /*global angular*/
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($rootScope, $http) {
        var services = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            getAllForms: getAllForms,
            getFormById: getFormById
        };
        return services;


        function getFormById(formId) {
            return $http.get("/api/assignment/form/" + formId);
        }

        function getAllForms() {
            return $http.get("/api/assignment/form/");
        }

        function createFormForUser(userId, form) {
            return $http.post("/api/assignment/user/" + userId + "/form", form);
        }

        function findAllFormsForUser(userId) {
            return $http.get("/api/assignment/user/" + userId + "/form");
        }

        function deleteFormById(formId){
            return $http.delete("/api/assignment/form/" + formId);
        }

        function updateFormById(formId, newForm){
            return $http.put("/api/assignment/form/" + formId, newForm);
        }


    }
})();

