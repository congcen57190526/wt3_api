module.exports = (db) => {
    const express = require('express');
    const router = express.Router();

    router.post('/', (req, res) => {
        const { Nama_Kategori, Deskripsi_Kategori } = req.body;
        const insertCategoryQuery = 'INSERT INTO Categories (Nama_Kategori, Deskripsi_Kategori) VALUES (?, ?)';
        db.query(insertCategoryQuery, [Nama_Kategori, Deskripsi_Kategori], (err, result) => {
            if (err) {
                console.error('Error creating new category:', err);
                return res.status(500).json({ error: 'Failed to create category' });
            }
            res.json({ message: 'Category created successfully' });
        });
    });

    router.get('/', (req, res) => {
        const getCategoriesQuery = 'SELECT * FROM Categories';
        db.query(getCategoriesQuery, (err, results) => {
            if (err) {
                console.error('Error fetching categories:', err);
                return res.status(500).json({ error: 'Failed to fetch categories' });
            }
            res.json(results);
        });
    });

    router.get('/:id', (req, res) => {
        const categoryId = req.params.id;
        const getCategoryQuery = 'SELECT * FROM Categories WHERE CategoryID = ?';
        db.query(getCategoryQuery, [categoryId], (err, results) => {
            if (err) {
                console.error('Error fetching category:', err);
                return res.status(500).json({ error: 'Failed to fetch category' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.json(results[0]);
        });
    });

    return router;
};
