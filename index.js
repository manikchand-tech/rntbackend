const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/customers.model.js'); // Replace with the actual path to the customer model
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const customerRoutes = require('./routes/customerRoutes.js')
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Connect to MongoDB (replace with your MongoDB connection string)
mongoose.connect("mongodb+srv://manikchandperadiya0:1234@cluster0.8j8jmoq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
).then(() => {
    console.log("connected to db")
    // Start the server

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(() => { console.log("connection failed") });


app.get('/', (req, res) => {
    res.send('hello from backend')
})



// Routes go here (see next step)
app.use('/customers', customerRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// app.post('/api/customers', async (req, res) => {
//     try {
//         const customer = new Customer(req.body);
//         await customer.save();
//         res.status(201).send(customer);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

// app.get('/api/customers', async (req, res) => {
//     try {
//         const customers = await Customer.find({});
//         res.send(customers);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });


