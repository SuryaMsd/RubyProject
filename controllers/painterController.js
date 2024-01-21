const pool = require('../db'); // Import your PostgreSQL connection pool
const dbUtils = require('../dbutils/dbUtils')

const getAllPainters = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM painters');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching painters', error);
        res.status(500).send('Internal Server Error');
    }
};

const getPainterById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM painters WHERE id = $1', [id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error(`Error fetching painter with id ${id}`, error);
        res.status(500).send('Internal Server Error');
    }
};

const createPainter = async (req, res) => {
    const { painter_name, mobile, dealer_name, place } = req.body;

    // Check for duplicate entry
    const isDuplicatePainter = await dbUtils.checkDuplicatePainter(painter_name, mobile);

    if (isDuplicatePainter) {
        // Handle duplicate painter error
        console.error('Duplicate painter entry!');
        res.status(400).json({ error: 'Duplicate painter entry' });
    } else {
        // Proceed with the insertion
        try {
            const result = await pool.query(
                'INSERT INTO painters (painter_name, mobile, dealer_name, place) VALUES ($1, $2, $3, $4) RETURNING *',
                [painter_name, mobile, dealer_name, place]
            );

            res.status(201).json(result.rows[0]); // Respond with the created painter
        } catch (error) {
            console.error('Error creating painter', error);
            res.status(500).send('Internal Server Error');
        }
    }
};


module.exports = { getAllPainters, getPainterById, createPainter };
