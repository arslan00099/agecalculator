const express = require('express');
const cors = require('cors'); // Import the CORS middleware

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

app.post('/calculate-age', (req, res) => {
    const { birthDate } = req.body;

    if (!birthDate) {
        return res.status(400).json({ error: 'Birth date is required' });
    }

    const birth = new Date(birthDate);
    if (isNaN(birth)) {
        return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
    }

    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (months < 0) {
        years--;
        months += 12;
    }

    if (days < 0) {
        months--;
        const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += previousMonth.getDate();
    }

    res.json({ years, months, days });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

