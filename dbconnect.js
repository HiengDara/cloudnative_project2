const mongoose = require('mongoose');

const url = 'mongodb+srv://darahieng9999:<Focl7faVsFD6S5J0>@cluster0.4hdfw.mongodb.net/cloudnative_assignment2?retryWrites=true&w=majority&appName=Cluster0';

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000, // Increase timeout
        });
        console.log('✅ MongoDB Connected Successfully');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err.message);
        process.exit(1); // Exit the process if the connection fails
    }
};

// Connect to MongoDB
connectDB();

module.exports = mongoose;
