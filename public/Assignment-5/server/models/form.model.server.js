module.exports = function (mongoose, db) {
    "use strict";
    var q = require("q");
    var uuid = require('node-uuid');
    var FormSchema = require('./form.schema.server.js')(mongoose);
    var formModel = mongoose.model("formModel", FormSchema);

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
        deleteFieldInForm: deleteFieldInForm,
        sortFieldsInForm: sortFieldsInForm
    };
    return api;

    // get all forms
    function getAllForms() {
        var deferred = q.defer();
        formModel.find(function (err, forms) {
            if (err) {
                deferred.reject(err);
                console.log("find all forms errors: " + err);
            } else {
                deferred.resolve(forms);
            }
        });
        return deferred.promise;
    }

    // get form by userid
    function findFormsByUserID(userId) {
        var deferred = q.defer();
        formModel.find({userId: userId}, function (err, forms) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(forms);
            }
        });
        return deferred.promise;
    }

    // get form by id
    function findFormById(formId) {

        var deferred = q.defer();
        formModel.findById(formId, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
    }

    // create form
    function createForm(userId, form) {
        var deferred = q.defer();
        form.userId = userId;
        //form._id = uuid.v4();
        formModel.create(form, function(err, newForm){
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                deferred.resolve(newForm);
            }
        });

        return deferred.promise;
    }

    // update form
    function updateForm(formId, newForm) {
        var deferred = q.defer();

        delete newForm._id;
        formModel.findByIdAndUpdate(formId, {$set: newForm}, function(err, form) {
            if(err) {
                deferred.reject(err);
            } else {
                formModel.find({userId: form.userId}, function (err, forms) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(forms);
                    }
                });
            }
        });

        return deferred.promise;
    }

    // delete form
    function deleteForm(formId) {
        var deferred = q.defer();
        formModel.findByIdAndRemove(formId, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                formModel.find({userId: form.userId}, function (err, forms) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(forms);
                    }
                });
            }
        });

        return deferred.promise;
    }

    // get form by title
    function findFormByTitle(title) {

        var deferred = q.defer();
        formModel.findOne({title: title}, function(err, forms){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(forms);
            }
        });
        return deferred.promise;
    }

    // get fields in form
    function findFieldsInForm (formId) {
        var deferred = q.defer();
        formModel.findById(formId, function(err, form){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(form.fields);
            }
        });
        return deferred.promise;
    }

    // get field by field id
    function findFieldInFormById (formId, fieldId) {
        var deferred = q.defer();
        formModel.findById(formId, function(err, form){
            if(err){
                deferred.reject(err);
            } else {
                for (var i in form.fields) {
                    if (form.fields[i]._id === fieldId) {
                        deferred.resolve(form.fields[i]);
                    }
                }
            }
        });
        return deferred.promise;
    }

    // create a field for a form
    function createFieldInForm (formId, field) {
        var deferred = q.defer();
        formModel.findByIdAndUpdate(formId, {$push: {fields: {$each: [field]}}}, function (err) {
            if(err){
                deferred.reject(err);
            } else {
                formModel.findById(formId, function(err, newForm) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(newForm.fields);
                    }
                });
            }
        });

        return deferred.promise;
    }

    //update a field in a form
    function updateFieldInForm (formId, fieldId, newField) {
        var deferred = q.defer();
            formModel.update({_id: formId, "fields._id": fieldId}, {$set: {"fields.$": newField}}, function(err, newForm) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(newField);
                }
            });

        return deferred.promise;
    }

    // delete a field in a form
    function deleteFieldInForm (formId, fieldId) {
        var deferred = q.defer();
        formModel.update({_id: formId} , {$pull: {"fields": {_id: fieldId}}}, function(err) {
                if(err) {
                    console.log(err);
                    deferred.reject(err);
                } else {
                    formModel.findById(formId, function(err, newForm) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            console.log(newForm);
                            deferred.resolve(newForm.fields);
                        }
                    });
                }
            });

        return deferred.promise;
    }

    function sortFieldsInForm (formId, fieldIds) {
        var deferred = q.defer();
        formModel.findById(formId, function(err, form){
            if(err){
                deferred.reject(err);
            } else {
                var newFields = [];
                for (var i in fieldIds) {
                    for (var j in form.fields) {
                        if (form.fields[j]._id == fieldIds[i]) {
                            newFields[i] = form.fields[j];
                        }
                    }
                }
                formModel.findByIdAndUpdate(formId, {$set: {"fields": newFields}}, function(err, form) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(form);
                    }
                });
            }
        });
        return deferred.promise;
    }
};