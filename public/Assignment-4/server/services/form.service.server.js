module.exports = function (app, model, db) {
    "use strict";

    var uuid = require('node-uuid');

    // get all forms by userId
    app.get("/api/assignment/user/:userId/form", findFormsByUserID);
    // get form by id
    app.get("/api/assignment/form/:formId", findFormById);
    // create form
    app.post("/api/assignment/user/:userId/form", createForm);
    // update form
    app.put("/api/assignment/form/:formId", updateForm);
    // delete form
    app.delete("/api/assignment/form/:formId", deleteForm);

    function findFormsByUserID (req, res) {
        var userId = req.params.userId;
        model
            .findFormsByUserID(userId)
            .then(function(forms){
                res.json(forms);
            });
    }

    function findFormById(req, res){
        var formId = req.params.formId;
        model
            .findFormById(formId)
            .then(function(form){
                res.json(form);
            });
    }


    function createForm (req, res) {
        var userId = req.params.userId;
        var form = req.body;
        model
            .createForm(userId, form)
            .then(function (forms) {
                res.json(forms);
            });
    }

    function updateForm (req, res) {
        var formId = req.params.formId;
        var newForm = req.body;
        model
            .updateForm(formId, newForm)
            .then(function (form) {
                res.json(form);
            });
    }

    function deleteForm (req, res) {
        var formId = req.params.formId;
        model
            .deleteForm(formId)
            .then(function (forms) {
                res.json(forms);
            });

    }
};