const express = require("express");
const editRouter = express.Router();
const pool = require('../modules/pool');


//when in the details component, editing will need a way to 
//move the info to the dtabase
editRouter.put('/:id', (req, res) => {
    const query = `UPDATE "movies" SET "title" = $1, "description" = $2 WHERE "id" = $3`;
    pool.query(query, [req.body.title, req.body.description, req.params.id])
        .then(response => {
            res.send(response.rows);
        })
        .catch(error => {
            console.log('error with put for details:', error);
        })
})
module.exports = editRouter;