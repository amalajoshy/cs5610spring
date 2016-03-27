module.exports = function (app, model, db) {
    "use strict";

    var uuid = require('node-uuid');

    // get all fields in a form
    app.get("/api/assignment/form/:formId/field", findFieldsInForm);
    // get field in a form by field id
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldInFormById);
    // create field in a form
    app.post("/api/assignment/form/:formId/field", createFieldInForm);
    // update field in a form
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldInForm);
    // delete field in a form by field id
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldInForm);

    function findFieldsInForm (req, res) {
        var formId = req.params.formId;
        res.json(model
            .findFieldsInForm(formId));
    }

    function findFieldInFormById (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(model
            .findFieldInFormById(formId, fieldId));
    }

    function createFieldInForm (req, res) {
        var formId = req.params.formId;
        var field = req.body;
        res.json(model
            .createFieldInForm(formId, field));
    }

    function updateFieldInForm (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var newField = req.body;
        res.json(model
            .updateFieldInForm(formId, fieldId, newField));
    }

    function deleteFieldInForm (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(model
            .deleteFieldInForm(formId, fieldId));
    }
};