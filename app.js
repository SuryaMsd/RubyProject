const express = require('express');
const bodyParser = require('body-parser');
const dealerRoutes = require('./routes/dealerRoutes');
const painterRoutes = require('./routes/painterRoutes');
const pool = require('./db');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));


app.use('/dealers', dealerRoutes);
app.use('/painters', painterRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});
