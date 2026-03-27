const server = require('express').Router();
const { createUser, validateUser,getUserProfile,deleteUser } = require('./user.auth.service');

server.post('/signup', async (req, res) => {
    console.log('Signup endpoint hit');
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);

   try{
    // Simulate user registration logic here
    // For example, you can check if the user already exists, hash the password, and save the user to the database
    await createUser(req.body)
    res.status(201).json({ message: 'User registered successfully' });
   }
    catch (error) {

        if (error.message === 'User already exists') {
            res.status(400).json({ message: 'User already exists' });
        } else {
            console.error('Error occurred while registering user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    
   }

});

server.post('/login', async (req, res) => {
    console.log('Login endpoint hit');
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);

    try {
        await validateUser(req.body);
        res.status(200).json({ message: 'User authenticated successfully' });
    }catch (error) {
        if (error.message === 'Invalid credentials') {
            res.status(401).json({ message: 'Invalid credentials' });
        } else {
            console.error('Error occurred while validating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

server.post('/profile/:userId', async (req, res) => {
    console.log('Profile endpoint hit');
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);

    // Simulate fetching user profile logic here
    // For example, you can verify the JWT token, fetch the user profile from the database, and return it in the response
    try{
        const userProfile = await getUserProfile(req.params.userId);
        res.status(200).json({ profile: userProfile });
    } catch (error) {
        if (error.message === 'User not found') {
            res.status(404).json({ message: 'User not found' });
        } else {
            console.error('Error occurred while fetching user profile:', error);
            res.status(500).json({ message: 'Internal server error' });

        }
    }
});

server.delete('/delete/:userId', async (req, res) => {
    console.log('Delete endpoint hit');
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);

    // Simulate user deletion logic here
    // For example, you can verify the JWT token, delete the user from the database, and return a success message in the response
    try {
        await deleteUser(req.params.userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error occurred while deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = server;