const express = require('express');
const app = express();

app.get('/phpmyadmin', (req, res) => {
  // Redirect users to phpMyAdmin URL
  res.redirect('http://localhost/phpmyadmin/index.php?route=/database/structure&db=trinhquocviet_2121110046');
});

// Khởi động server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
//Không áp dụng được