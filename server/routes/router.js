const express = require("express");
const router = express.Router();
const pool = require('../modules/pool');


//gettinbg all movies from the database
router.get('/', (req, res) => {
    const query = 'SELECT * FROM movies';
    pool.query(query)
        .then(response => {
            res.send(response.rows);
        })
        .catch(error => {
            console.log('the get route for all movies failed:', error);
        })
})



module.exports = router;