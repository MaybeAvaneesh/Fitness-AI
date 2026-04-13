const server = require('express').Router();


server.get('/:userId', async (req, res) => {
    console.log('Pain endpoint hit');
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);

    // Simulate fetching pain data logic here
    // For example, you can fetch the pain data from the database and return it in the response
    try {
        const userId = req.params.userId;
        const painData = await getPainData(userId);
        res.status(200).json(painData);
       
    }catch (error) {
        console.error('Error occurred while fetching pain data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

server.put('/:userId', async (req, res) => {
    console.log('Pain endpoint hit');
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);

    // Simulate updating pain data logic here
    // For example, you can update the pain data in the database and return a success message in the response
    try {
        const userId = req.params.userId;
        const painData = req.body;
        await updatePainData(userId, painData);
        res.status(200).json({ message: 'Pain data updated successfully' });
    }catch (error) {
        console.error('Error occurred while updating pain data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = server;