// This file contains the logic for handling data-related operations, such as retrieving and manipulating data from the database.

const db = require('../config/db');

// Function to get all data
exports.getAllData = async (req, res) => {
    try {
        const data = await db.query('SELECT * FROM your_table_name'); // Replace 'your_table_name' with your actual table name
        res.status(200).json(data.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving data', error });
    }
};

// Function to create new data
exports.createData = async (req, res) => {
    const { field1, field2 } = req.body; // Replace with your actual fields
    try {
        const result = await db.query('INSERT INTO your_table_name (field1, field2) VALUES ($1, $2) RETURNING *', [field1, field2]); // Replace 'your_table_name' and fields accordingly
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error creating data', error });
    }
};

// Function to update data
exports.updateData = async (req, res) => {
    const { id } = req.params; // Assuming you're passing the ID in the URL
    const { field1, field2 } = req.body; // Replace with your actual fields
    try {
        const result = await db.query('UPDATE your_table_name SET field1 = $1, field2 = $2 WHERE id = $3 RETURNING *', [field1, field2, id]); // Replace 'your_table_name' and fields accordingly
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error updating data', error });
    }
};

// Function to delete data
exports.deleteData = async (req, res) => {
    const { id } = req.params; // Assuming you're passing the ID in the URL
    try {
        const result = await db.query('DELETE FROM your_table_name WHERE id = $1 RETURNING *', [id]); // Replace 'your_table_name' accordingly
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting data', error });
    }
};