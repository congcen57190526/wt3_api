module.exports = (db) => {
    const express = require('express');
    const router = express.Router();

    router.post('/', (req, res) => {
        const { Nama_Lokasi, Deskripsi_Lokasi } = req.body;
        const insertLocationQuery = 'INSERT INTO Storage_Locations (Nama_Lokasi, Deskripsi_Lokasi) VALUES (?, ?)';
        db.query(insertLocationQuery, [Nama_Lokasi, Deskripsi_Lokasi], (err, result) => {
            if (err) {
                console.error('Error creating new storage location:', err);
                return res.status(500).json({ error: 'Failed to create storage location' });
            }
            res.json({ message: 'Storage location created successfully' });
        });
    });

    router.get('/', (req, res) => {
        const getLocationsQuery = 'SELECT * FROM Storage_Locations';
        db.query(getLocationsQuery, (err, results) => {
            if (err) {
                console.error('Error fetching storage locations:', err);
                return res.status(500).json({ error: 'Failed to fetch storage locations' });
            }
            res.json(results);
        });
    });

    // Read a storage location by ID
    router.get('/:id', (req, res) => {
        const locationId = req.params.id;
        const getLocationQuery = 'SELECT * FROM Storage_Locations WHERE LocationID = ?';
        db.query(getLocationQuery, [locationId], (err, results) => {
            if (err) {
                console.error('Error fetching storage location:', err);
                return res.status(500).json({ error: 'Failed to fetch storage location' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Storage location not found' });
            }
            res.json(results[0]);
        });
    });

    router.put('/:id', (req, res) => {
        const locationId = req.params.id;
        const { Nama_Lokasi, Deskripsi_Lokasi } = req.body;
        const updateLocationQuery = 'UPDATE Storage_Locations SET Nama_Lokasi = ?, Deskripsi_Lokasi = ? WHERE LocationID = ?';
        db.query(updateLocationQuery, [Nama_Lokasi, Deskripsi_Lokasi, locationId], (err, result) => {
            if (err) {
                console.error('Error updating storage location:', err);
                return res.status(500).json({ error: 'Failed to update storage location' });
            }
            res.json({ message: 'Storage location updated successfully' });
        });
    });

    router.delete('/:id', (req, res) => {
        const locationId = req.params.id;
        const deleteLocationQuery = 'DELETE FROM Storage_Locations WHERE LocationID = ?';
        db.query(deleteLocationQuery, [locationId], (err, result) => {
            if (err) {
                console.error('Error deleting storage location:', err);
                return res.status(500).json({ error: 'Failed to delete storage location' });
            }
            res.json({ message: 'Storage location deleted successfully' });
        });
    });

    return router;
};
