const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

 const UserRoutes = require('./routes/userRoutes');
 const ItemRoutes = require('./routes/ItemRoutes');


//Connect DB
dotenv.config();
connectDB();

const app = express();

//Increase payload size limits
app.use(bodyParser.json({ limit : '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true}));

app.use(cors());
app.use(express.json());

app.use('/api/users', UserRoutes);
app.use('/api/items', ItemRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



