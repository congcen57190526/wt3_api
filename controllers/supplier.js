module.exports = (db) => {
    const express = require('express');
    const router = express.Router();

    router.post('/', (req, res) => {
        const { Nama_Pemasok, Alamat, Kontak, Email, Nomor_Telepon } = req.body;
        const insertSupplierQuery = 'INSERT INTO Suppliers (Nama_Pemasok, Alamat, Kontak, Email, Nomor_Telepon) VALUES (?, ?, ?, ?, ?)';
        db.query(insertSupplierQuery, [Nama_Pemasok, Alamat, Kontak, Email, Nomor_Telepon], (err, result) => {
            if (err) {
                console.error('Error creating new supplier:', err);
                return res.status(500).json({ error: 'Failed to create supplier' });
            }
            res.json({ message: 'Supplier created successfully' });
        });
    });

    router.get('/', (req, res) => {
        const getSuppliersQuery = 'SELECT * FROM Suppliers';
        db.query(getSuppliersQuery, (err, results) => {
            if (err) {
                console.error('Error fetching suppliers:', err);
                return res.status(500).json({ error: 'Failed to fetch suppliers' });
            }
            res.json(results);
        });
    });

    router.get('/:id', (req, res) => {
        const supplierId = req.params.id;
        const getSupplierQuery = 'SELECT * FROM Suppliers WHERE SupplierID = ?';
        db.query(getSupplierQuery, [supplierId], (err, results) => {
            if (err) {
                console.error('Error fetching supplier:', err);
                return res.status(500).json({ error: 'Failed to fetch supplier' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Supplier not found' });
            }
            res.json(results[0]);
        });
    });

    return router;
};
