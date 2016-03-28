module.exports = function (app) {
    "use strict";

    var forms = require("./form.mock.json");
    var uuid = require('node-uuid');

    var api = {
        createForm: createForm,
        findFormsByUserID: findFormsByUserID,
        deleteForm: deleteForm,
        updateForm: updateForm,
        getAllForms: getAllForms,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,
        findFieldsInForm: findFieldsInForm,
        findFieldInFormById: findFieldInFormById,
        createFieldInForm: createFieldInForm,
        updateFieldInForm: updateFieldInForm,
        deleteFieldInForm: deleteFieldInForm
    };
    return api;

    // get all forms
    function getAllForms() {
       return forms;
    }

    // get form by userid
    function findFormsByUserID (userId) {
        var userForms = [];
        for (var i in forms) {
            if (userId == forms[i].userId) {
                userForms.push(forms[i]);
            }
        }
        return userForms;
    }
    // get form by id
    function findFormById (formId) {
        for (var i in forms) {
            if (formId == forms[i]._id) {
                return forms[i];
            }
        }
        return null;
    }

    // create form
    function createForm (userId, form) {
        form.userId = userId;
        form._id = uuid.v4();
        forms.push(form);
        return form;
    }


    // update form
    function updateForm (formId, newForm) {
        for (var i in forms) {
            if (forms[i]._id == formId) {
                forms[i] = newForm;
                forms[i]._id = formId;
                return forms[i];
            }
        }
        return null;
    }

    // delete form
    function deleteForm (formId) {
        for (var i in forms) {
            if (forms[i]._id == formId) {
                forms.splice(i, 1);
            }
        }
        return forms;
    }


    // get form by title
    function findFormByTitle(title){
        for (var i in forms) {
            if (forms[i].title === title) {
                return forms[i];
            }
        }
        return null;
    }
    // get fields in form
    function findFieldsInForm (formId) {
        for (var i in forms) {
            if (formId == forms[i]._id) {
                return forms[i].fields;
            }
        }
        return null;
    }
    // get fields by field id
    function findFieldInFormById (formId, fieldId) {
        for (var i in forms) {
            if (forms[i]._id == formId) {
                for (var j in forms[i].fields) {
                    if (forms[i].fields[j]._id === fieldId) {
                        return forms[i].fields[j];
                    }
                }
                break;
            }
        }
        return null;
    }

    //create a field in a form
    function createFieldInForm (formId, field) {
        field._id = uuid.v4();
        for (var i in forms) {
            if (forms[i]._id == formId) {
                forms[i].fields.push(field);
                return forms[i].fields;
            }
        }
        return null;
    }

    //update a field in a form
    function updateFieldInForm (formId, fieldId, newField) {
        for (var i in forms) {
            if (forms[i]._id == formId) {
                for (var j in forms[i].fields) {
                    if (forms[i].fields[j]._id == fieldId) {
                        forms[i].fields[j] = newField;
                        forms[i].fields[j]._id = fieldId;
                        return forms[i].fields[j];
                    }
                }
                break;
            }
        }
        return null;
    }

    // delete a field in a form
    function deleteFieldInForm (formId, fieldId) {
        for (var i in forms) {
            if (forms[i]._id == formId) {
                for (var j in forms[i].fields) {
                    if (forms[i].fields[j]._id == fieldId) {
                        forms[i].fields.splice(j, 1);
                        return forms[i].fields;
                    }
                }
                break;
            }
        }
        return null;
    }
};