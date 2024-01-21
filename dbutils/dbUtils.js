
const db = require('../db'); // Adjust the path accordingly

const checkDuplicateDealer = async (dealerName, mobile) => {
    try {
        const result = await db.query(
            'SELECT * FROM dealers WHERE dealer_name = $1 AND mobile = $2',
            [dealerName, mobile]
        );
        return result.length > 0;
    } catch (error) {
        console.error('Error checking duplicate dealer', error);
        throw error;
    }
};

const checkDuplicatePainter = async (painterName, mobile) => {
    try {
        const result = await db.query(
            'SELECT * FROM painters WHERE painter_name = $1 AND mobile = $2',
            [painterName, mobile]
        );
        return result.length > 0;
    } catch (error) {
        console.error('Error checking duplicate painter', error);
        throw error;
    }
};

module.exports = {
    checkDuplicateDealer,
    checkDuplicatePainter
    // Other utility functions can be added here
};
