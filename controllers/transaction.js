module.exports = (db) => {
    const express = require('express');
    const router = express.Router();

    router.post('/', (req, res) => {
        const { ItemID, Jenis_Transaksi, Tanggal_Transaksi, Kuantitas, Harga_Per_Unit, Total_Harga, Keterangan } = req.body;
        const insertTransactionQuery = 'INSERT INTO Transactions (ItemID, Jenis_Transaksi, Tanggal_Transaksi, Kuantitas, Harga_Per_Unit, Total_Harga, Keterangan) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(insertTransactionQuery, [ItemID, Jenis_Transaksi, Tanggal_Transaksi, Kuantitas, Harga_Per_Unit, Total_Harga, Keterangan], (err, result) => {
            if (err) {
                console.error('Error creating new transaction:', err);
                return res.status(500).json({ error: 'Failed to create transaction' });
            }
            res.json({ message: 'Transaction created successfully' });
        });
    });

    // Read all transactions
    router.get('/', (req, res) => {
        const getTransactionsQuery = 'SELECT * FROM Transactions';
        db.query(getTransactionsQuery, (err, results) => {
            if (err) {
                console.error('Error fetching transactions:', err);
                return res.status(500).json({ error: 'Failed to fetch transactions' });
            }
            res.json(results);
        });
    });

    router.get('/:id', (req, res) => {
        const transactionId = req.params.id;
        const getTransactionQuery = 'SELECT * FROM Transactions WHERE TransactionID = ?';
        db.query(getTransactionQuery, [transactionId], (err, results) => {
            if (err) {
                console.error('Error fetching transaction:', err);
                return res.status(500).json({ error: 'Failed to fetch transaction' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Transaction not found' });
            }
            res.json(results[0]);
        });
    });

    router.put('/:id', (req, res) => {
        const transactionId = req.params.id;
        const { ItemID, Jenis_Transaksi, Tanggal_Transaksi, Kuantitas, Harga_Per_Unit, Total_Harga, Keterangan } = req.body;
        const updateTransactionQuery = 'UPDATE Transactions SET ItemID = ?, Jenis_Transaksi = ?, Tanggal_Transaksi = ?, Kuantitas = ?, Harga_Per_Unit = ?, Total_Harga = ?, Keterangan = ? WHERE TransactionID = ?';
        db.query(updateTransactionQuery, [ItemID, Jenis_Transaksi, Tanggal_Transaksi, Kuantitas, Harga_Per_Unit, Total_Harga, Keterangan, transactionId], (err, result) => {
            if (err) {
                console.error('Error updating transaction:', err);
                return res.status(500).json({ error: 'Failed to update transaction' });
            }
            res.json({ message: 'Transaction updated successfully' });
        });
    });

    router.delete('/:id', (req, res) => {
        const transactionId = req.params.id;
        const deleteTransactionQuery = 'DELETE FROM Transactions WHERE TransactionID = ?';
        db.query(deleteTransactionQuery, [transactionId], (err, result) => {
            if (err) {
                console.error('Error deleting transaction:', err);
                return res.status(500).json({ error: 'Failed to delete transaction' });
            }
            res.json({ message: 'Transaction deleted successfully' });
        });
    });

    return router;
};
