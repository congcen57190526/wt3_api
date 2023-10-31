-- Tabel Barang (Items)
CREATE TABLE Items (
    ItemID INT AUTO_INCREMENT PRIMARY KEY,
    Nama_Barang VARCHAR(255) NOT NULL,
    Deskripsi TEXT,
    Harga DECIMAL(10, 2),
    Jumlah_Stok INT,
    Satuan VARCHAR(50),
    Lokasi_Penyimpanan VARCHAR(255),
    Tanggal_Pembelian DATE,
    PemasokID INT,
    FOREIGN KEY (PemasokID) REFERENCES Suppliers(SupplierID)
);

-- Tabel Transaksi (Transactions)
CREATE TABLE Transactions (
    TransactionID INT AUTO_INCREMENT PRIMARY KEY,
    ItemID INT,
    Jenis_Transaksi ENUM('Pembelian', 'Penjualan', 'Pemindahan', 'Lainnya') NOT NULL,
    Tanggal_Transaksi DATE,
    Kuantitas INT,
    Harga_Per_Unit DECIMAL(10, 2),
    Total_Harga DECIMAL(10, 2),
    Keterangan TEXT,
    FOREIGN KEY (ItemID) REFERENCES Items(ItemID)
);

-- Tabel Kategori (Categories)
CREATE TABLE Categories (
    CategoryID INT AUTO_INCREMENT PRIMARY KEY,
    Nama_Kategori VARCHAR(255) NOT NULL,
    Deskripsi_Kategori TEXT
);

-- Tabel Pemasok (Suppliers)
CREATE TABLE Suppliers (
    SupplierID INT AUTO_INCREMENT PRIMARY KEY,
    Nama_Pemasok VARCHAR(255) NOT NULL,
    Alamat TEXT,
    Kontak VARCHAR(100),
    Email VARCHAR(100),
    Nomor_Telepon VARCHAR(20)
);

-- Tabel Penyimpanan (Storage Locations)
CREATE TABLE Storage_Locations (
    LocationID INT AUTO_INCREMENT PRIMARY KEY,
    Nama_Lokasi VARCHAR(255) NOT NULL,
    Deskripsi_Lokasi TEXT
);

-- Tabel Karyawan (Employees)
CREATE TABLE Employees (
    EmployeeID INT AUTO_INCREMENT PRIMARY KEY,
    Nama_Karyawan VARCHAR(255) NOT NULL,
    Jabatan VARCHAR(100),
    Nomor_Telepon VARCHAR(20),
    Email VARCHAR(100),
    Tanggal_Pekerjaan DATE
);

-- Tabel Laporan (Reports)
CREATE TABLE Reports (
    ReportID INT AUTO_INCREMENT PRIMARY KEY,
    Tanggal_Laporan DATE,
    Jenis_Laporan VARCHAR(100),
    Isi_Laporan TEXT
);

-- Tabel Stok Minimum (Minimum Stock)
CREATE TABLE Minimum_Stock (
    MinimumStockID INT AUTO_INCREMENT PRIMARY KEY,
    ItemID INT,
    Jumlah_Minimum INT,
    FOREIGN KEY (ItemID) REFERENCES Items(ItemID)
);

-- Tabel Audit (Audit Logs)
CREATE TABLE Audit_Logs (
    AuditLogID INT AUTO_INCREMENT PRIMARY KEY,
    Tanggal_Waktu DATETIME,
    Tindakan VARCHAR(100),
    ItemID INT,
    Kuantitas INT,
    Pengguna_Yang_Melakukan_Tindakan VARCHAR(100),
    FOREIGN KEY (ItemID) REFERENCES Items(ItemID)
);
