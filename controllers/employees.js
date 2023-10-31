module.exports = (db) => {
    const express = require('express');
    const router = express.Router();

    router.post('/', (req, res) => {
        const { Nama_Karyawan, Jabatan, Nomor_Telepon, Email, Tanggal_Pekerjaan } = req.body;
        const insertEmployeeQuery = 'INSERT INTO Employees (Nama_Karyawan, Jabatan, Nomor_Telepon, Email, Tanggal_Pekerjaan) VALUES (?, ?, ?, ?, ?)';
        db.query(insertEmployeeQuery, [Nama_Karyawan, Jabatan, Nomor_Telepon, Email, Tanggal_Pekerjaan], (err, result) => {
            if (err) {
                console.error('Error creating a new employee:', err);
                return res.status(500).json({ error: 'Failed to create employee' });
            }
            res.json({ message: 'Employee created successfully' });
        });
    });

    router.get('/', (req, res) => {
        const getEmployeesQuery = 'SELECT * FROM Employees';
        db.query(getEmployeesQuery, (err, results) => {
            if (err) {
                console.error('Error fetching employees:', err);
                return res.status(500).json({ error: 'Failed to fetch employees' });
            }
            res.json(results);
        });
    });

    router.get('/:id', (req, res) => {
        const employeeId = req.params.id;
        const getEmployeeQuery = 'SELECT * FROM Employees WHERE EmployeeID = ?';
        db.query(getEmployeeQuery, [employeeId], (err, results) => {
            if (err) {
                console.error('Error fetching employee:', err);
                return res.status(500).json({ error: 'Failed to fetch employee' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Employee not found' });
            }
            res.json(results[0]);
        });
    });

    router.put('/:id', (req, res) => {
        const employeeId = req.params.id;
        const { Nama_Karyawan, Jabatan, Nomor_Telepon, Email, Tanggal_Pekerjaan } = req.body;
        const updateEmployeeQuery = 'UPDATE Employees SET Nama_Karyawan = ?, Jabatan = ?, Nomor_Telepon = ?, Email = ?, Tanggal_Pekerjaan = ? WHERE EmployeeID = ?';
        db.query(updateEmployeeQuery, [Nama_Karyawan, Jabatan, Nomor_Telepon, Email, Tanggal_Pekerjaan, employeeId], (err, result) => {
            if (err) {
                console.error('Error updating employee:', err);
                return res.status(500).json({ error: 'Failed to update employee' });
            }
            res.json({ message: 'Employee updated successfully' });
        });
    });

    // Delete an employee by ID
    router.delete('/:id', (req, res) => {
        const employeeId = req.params.id;
        const deleteEmployeeQuery = 'DELETE FROM Employees WHERE EmployeeID = ?';
        db.query(deleteEmployeeQuery, [employeeId], (err, result) => {
            if (err) {
                console.error('Error deleting employee:', err);
                return res.status(500).json({ error: 'Failed to delete employee' });
            }
            res.json({ message: 'Employee deleted successfully' });
        });
    });

    return router;
};
