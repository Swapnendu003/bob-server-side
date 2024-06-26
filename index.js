const express = require('express');
const cors = require('cors');
const connectDatabase = require('./config/database');
const dataRoutes = require('./routes/dataRoutes');
const financialRoutes = require('./routes/financialRoutes');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json()); // JSON middleware
app.use(cors({ origin: '*' }));

app.use('/user', dataRoutes);
app.use(bodyParser.json());
app.use('/api', financialRoutes);


app.all('/', (req, res) => {
    console.log('Just got a request!');
    console.log('MONGO_URI:', process.env.MONGO_URI);
    res.send('Yo yo');
});

connectDatabase();

app.listen(process.env.PORT || 3000, () => {
    console.log('Your Server is running');
});
