// const express = require('express');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// app.use(express.json());
// app.use(express.static('public')); // Serve static files from the public directory

// app.post('/save-timing', (req, res) => {
//     const { userId, design, timeTaken } = req.body;

//     // Validate input
//     if (!userId || !design || timeTaken == null) {
//         return res.status(400).json({ message: 'userId, design, and timeTaken are required' });
//     }

//     const parsedTime = parseFloat(timeTaken);
//     if (isNaN(parsedTime)) {
//         return res.status(400).json({ message: 'timeTaken must be a number' });
//     }

//     const filePath = path.join(__dirname, 'timingData.json');

//     let existingData = [];
//     if (fs.existsSync(filePath)) {
//         existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
//     }

//     existingData.push({ userId, design, timeTaken: parsedTime });
//     fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

//     res.json({ message: 'Timing saved successfully' });
// });


// // Route to clear timing data
// app.delete('/clear-data', (req, res) => {
//     const filePath = path.join(__dirname, 'timingData.json');

//     if (fs.existsSync(filePath)) {
//         fs.writeFileSync(filePath, JSON.stringify([], null, 2)); // Clear the data
//         res.json({ message: 'Timing data cleared successfully' });
//     } else {
//         res.status(404).json({ message: 'No timing data found' });
//     }
// });


// // Route to fetch user timing data
// app.get('/get-user-timing', (req, res) => {
//     const userId = req.query.userId;
//     let userTimingData = { timeA: 0, timeB: 0 };

//     const filePath = path.join(__dirname, 'timingData.json');
//     if (fs.existsSync(filePath)) {
//         const existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
//         const userEntries = existingData.filter(entry => entry.userId === userId);
//         userEntries.forEach(entry => {
//             if (entry.design === 'A') {
//                 userTimingData.timeA = entry.timeTaken;
//             } else if (entry.design === 'B') {
//                 userTimingData.timeB = entry.timeTaken;
//             }
//         });
//     }

//     res.json(userTimingData);
// });

// // Route to calculate and return overall statistics
// app.get('/statistics', (req, res) => {
//     const filePath = path.join(__dirname, 'timingData.json');
//     if (!fs.existsSync(filePath)) {
//         return res.json({ meanA: 0, meanB: 0, medianA: 0, medianB: 0, varianceA: 0, varianceB: 0 });
//     }

//     const existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
//     const timesA = existingData.filter(entry => entry.design === 'A').map(entry => entry.timeTaken);
//     const timesB = existingData.filter(entry => entry.design === 'B').map(entry => entry.timeTaken);

//     const statsA = calculateStatistics(timesA);
//     const statsB = calculateStatistics(timesB);

//     res.json({ meanA: statsA.mean, medianA: statsA.median, varianceA: statsA.variance,
//                 meanB: statsB.mean, medianB: statsB.median, varianceB: statsB.variance });
// });

// // Function to calculate mean, median, and variance
// function calculateStatistics(times) {
//     if (times.length === 0) {
//         return { mean: 0, median: 0, variance: 0 };
//     }
    
//     const mean = times.reduce((acc, val) => acc + val, 0) / times.length;
//     const median = calculateMedian(times);
//     const variance = times.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / times.length;

//     return { mean, median, variance };
// }

// // Function to calculate median
// function calculateMedian(times) {
//     const sorted = [...times].sort((a, b) => a - b);
//     const mid = Math.floor(sorted.length / 2);
//     return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
// }

// app.get('/', (req, res) => {
//     res.send('Welcome to the Booking App!');
// });


// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });


const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public')); // Serve static files from the public directory

app.post('/save-timing', (req, res) => {
    const { userId, design, timeTaken } = req.body;
    // Validate input
    if (!userId || !design || timeTaken == null) {
        return res.status(400).json({ message: 'userId, design, and timeTaken are required' });
    }
    const parsedTime = parseFloat(timeTaken);
    if (isNaN(parsedTime)) {
        return res.status(400).json({ message: 'timeTaken must be a number' });
    }
    const filePath = path.join(__dirname, 'timingData.json');
    let existingData = [];
    if (fs.existsSync(filePath)) {
        existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    existingData.push({ userId, design, timeTaken: parsedTime });
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    res.json({ message: 'Timing saved successfully' });
});

// Route to clear timing data
app.delete('/clear-data', (req, res) => {
    const filePath = path.join(__dirname, 'timingData.json');
    if (fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([], null, 2)); // Clear the data
        res.json({ message: 'Timing data cleared successfully' });
    } else {
        res.status(404).json({ message: 'No timing data found' });
    }
});

// Route to fetch user timing data
app.get('/get-user-timing', (req, res) => {
    const userId = req.query.userId;
    let userTimingData = { timeA: 0, timeB: 0 };
    const filePath = path.join(__dirname, 'timingData.json');
    if (fs.existsSync(filePath)) {
        const existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const userEntries = existingData.filter(entry => entry.userId === userId);
        userEntries.forEach(entry => {
            if (entry.design === 'A') {
                userTimingData.timeA = entry.timeTaken;
            } else if (entry.design === 'B') {
                userTimingData.timeB = entry.timeTaken;
            }
        });
    }
    res.json(userTimingData);
});

// Route to calculate and return overall statistics
app.get('/statistics', (req, res) => {
    const filePath = path.join(__dirname, 'timingData.json');
    if (!fs.existsSync(filePath)) {
        return res.json({ meanA: 0, meanB: 0, medianA: 0, medianB: 0, varianceA: 0, varianceB: 0 });
    }
    const existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const timesA = existingData.filter(entry => entry.design === 'A').map(entry => entry.timeTaken);
    const timesB = existingData.filter(entry => entry.design === 'B').map(entry => entry.timeTaken);
    const statsA = calculateStatistics(timesA);
    const statsB = calculateStatistics(timesB);
    res.json({ meanA: statsA.mean, medianA: statsA.median, varianceA: statsA.variance, meanB: statsB.mean, medianB: statsB.median, varianceB: statsB.variance });
});

// Function to calculate mean, median, and variance
function calculateStatistics(times) {
    if (times.length === 0) {
        return { mean: 0, median: 0, variance: 0 };
    }
    const mean = times.reduce((acc, val) => acc + val, 0) / times.length;
    const median = calculateMedian(times);
    const variance = times.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / times.length;
    return { mean, median, variance };
}

// Function to calculate median
function calculateMedian(times) {
    const sorted = [...times].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

// Route to serve the private statistics file
app.get('/private/statistics', (req, res) => {
    res.sendFile(path.join(__dirname, 'statistics.html'));
});

// Serve the index file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/test', (req, res) => {
    res.send('Server is working!');
});

