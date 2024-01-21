const pool = require('../db'); // Import your PostgreSQL connection pool
const dbUtils = require('../dbutils/dbUtils')

const getAllDealers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM dealers');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching dealers', error);
        res.status(500).send('Internal Server Error');
    }
};

const getDealerByUID = async (req, res) => {
    const dealerUID = req.params.dealers_uid;

    try {
        const result = await pool.query('SELECT * FROM dealers WHERE dealers_uid = $1', [dealerUID]);

        if (result.rows.length === 0) {
            res.status(404).send('Dealer not found');
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error('Error fetching dealer by UID', error);
        res.status(500).send('Internal Server Error');
    }
};

const createDealer = async (req, res) => {
    const { dealer_name, mobile, place } = req.body;

    // Check for duplicate entry
    const isDuplicateDealer = await dbUtils.checkDuplicateDealer(dealer_name, mobile);

    if (isDuplicateDealer) {
        // Handle duplicate dealer error
        console.error('Duplicate dealer entry!');
        res.status(400).json({ error: 'Duplicate dealer entry' });
    } else {
        // Proceed with the insertion
        try {
            const result = await pool.query(
                'INSERT INTO dealers (dealer_name, mobile, place) VALUES ($1, $2, $3) RETURNING *',
                [dealer_name, mobile, place]
            );

            res.status(201).json(result.rows[0]); // Respond with the created dealer
        } catch (error) {
            console.error('Error creating dealer', error);
            res.status(500).send('Internal Server Error');
        }
    }
};

const updateDealer = async (req, res) => {
    const dealerUID = req.params.dealers_uid;
    const { dealer_name, mobile, place } = req.body;

    try {
        const result = await pool.query(
            'UPDATE dealers SET dealer_name = $1, mobile = $2, place = $3 WHERE dealers_uid = $4 RETURNING *',
            [dealer_name, mobile, place, dealerUID]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating dealer', error);
        res.status(500).send('Internal Server Error');
    }
};

const deleteDealer = async (req, res) => {
    const dealerUID = req.params.dealers_uid;

    try {
        const result = await pool.query(
            'DELETE FROM dealers WHERE dealers_uid = $1 RETURNING *',
            [dealerUID]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error deleting dealer', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { getAllDealers,getDealerByUID,createDealer,updateDealer,deleteDealer, };
