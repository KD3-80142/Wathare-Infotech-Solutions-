const express = require('express');

const mongoose = require('mongoose');

const app = express();

const mongoURI = 'mongodb://localhost:27017/Data';


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

  const dataSchema = new mongoose.Schema({
    ts: Date,
    machine_status:Number,
    vibration: Number
});


const Data = mongoose.model('Data', dataSchema);


app.get('/api/data', async (req, res) => {
    try {
        const data = await Data.find();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});