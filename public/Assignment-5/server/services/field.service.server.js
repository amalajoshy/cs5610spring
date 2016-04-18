module.exports = function (app, model, db) {
    "use strict";
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

    app.post("/api/assignment/form/:formId/field/sort", sortFieldsInForm);

    function findFieldsInForm (req, res) {
        var formId = req.params.formId;
        model
            .findFieldsInForm(formId)
            .then(function (fields) {
                res.json(fields);
            });
    }

    function findFieldInFormById (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model
            .findFieldInFormById(formId, fieldId)
            .then(function (field) {
                res.json(field);
            });
    }

    function createFieldInForm (req, res) {
        var formId = req.params.formId;
        var field = req.body;
        model
            .createFieldInForm(formId, field)
            .then(function (fields) {
                res.json(fields);
            });
    }

    function updateFieldInForm (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var newField = req.body;
        model
            .updateFieldInForm(formId, fieldId, newField)
            .then(function (field) {
                res.json(field);
            });
    }

    function deleteFieldInForm (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model
            .deleteFieldInForm(formId, fieldId)
            .then(function (fields) {
                res.json(fields);
            });
    }

    function sortFieldsInForm(req, res) {
        var formId = req.params.formId;
        var fields = req.body;
        model
            .sortFieldsInForm(formId, fields)
            .then(function (fields) {
                res.json(fields);
            });
    }
};