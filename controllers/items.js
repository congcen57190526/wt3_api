module.exports = (db) => {
    const express = require('express');
    const router = express.Router();

    router.post('/', (req, res) => {
        const {
            Nama_Barang,
            Deskripsi,
            Harga,
            Jumlah_Stok,
            Satuan,
            Lokasi_Penyimpanan,
            Tanggal_Pembelian,
            PemasokID
        } = req.body;
        const insertItemQuery = 'INSERT INTO Items (Nama_Barang, Deskripsi, Harga, Jumlah_Stok, Satuan, Lokasi_Penyimpanan, Tanggal_Pembelian, PemasokID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(insertItemQuery, [Nama_Barang, Deskripsi, Harga, Jumlah_Stok, Satuan, Lokasi_Penyimpanan, Tanggal_Pembelian, PemasokID], (err, result) => {
            if (err) {
                console.error('Error creating new item:', err);
                return res.status(500).json({error: 'Failed to create item'});
            }
            res.json({message: 'Item created successfully'});
        });
    });

    router.get('/', (req, res) => {
        const getItemsQuery = 'SELECT * FROM Items';
        db.query(getItemsQuery, (err, results) => {
            if (err) {
                console.error('Error fetching items:', err);
                return res.status(500).json({error: 'Failed to fetch items'});
            }
            res.json(results);
        });
    });

    router.get('/:id', (req, res) => {
        const itemId = req.params.id;
        const getItemQuery = 'SELECT * FROM Items WHERE ItemID = ?';
        db.query(getItemQuery, [itemId], (err, results) => {
            if (err) {
                console.error('Error fetching item:', err);
                return res.status(500).json({error: 'Failed to fetch item'});
            }
            if (results.length === 0) {
                return res.status(404).json({error: 'Item not found'});
            }
            res.json(results[0]);
        });
    });

    return router;
};
  