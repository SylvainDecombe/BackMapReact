module.exports = app => {
    const crud = require ("../controllers/CrudController.js");

    var router = require ("express").Router();

    router.post("/", crud.create);

    router.get("/:id", crud.update);

    router.get("/:id", crud.delete);

    router.get("/", crud.deleteAll);

    app.use("/api/crud", router);
};