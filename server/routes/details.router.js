const express = require("express");
const detailsRouter = express.Router();
const pool = require('../modules/pool');

//getting only the details from a specific movie
detailsRouter.get('/:id', (req, res) => {
    const query = `SELECT * FROM movies WHERE id=$1`;
    pool.query(query, [req.params.id])
        .then(response => {
            res.send(response.rows);
        })
        .catch(error => {
            console.log('error with get the details:', error);
        })
})


module.exports = detailsRouter;