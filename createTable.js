const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'trinhquocviet',
  password: '',
  database: 'trinhquocviet_db'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
  
  // Thực hiện truy vấn SQL để tạo bảng
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50),
      email VARCHAR(50)
    )
  `;

  connection.query(createTableQuery, (err, result) => {
    if (err) throw err;
    console.log('Table "users" created successfully!');
    
    // Đóng kết nối sau khi thực hiện truy vấn
    connection.end((err) => {
      if (err) throw err;
      console.log('Connection closed.');
    });
  });
});
