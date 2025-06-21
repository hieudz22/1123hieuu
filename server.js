require('dotenv').config();
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Load SSL (chỉ dùng nếu bạn thực sự cần https local)
const privateKey = fs.readFileSync('./ssl/b86club.key', 'utf8');
const certificate = fs.readFileSync('./ssl/b86club.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const app = express();
const server = https.createServer(credentials, app);
const expressWs = require('express-ws')(app);

// Cấu hình CORS
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}));

// Cấu hình middleware body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cấu hình view engine ejs
app.set('view engine', 'ejs');
app.set('views', './views');

// Serve static files từ thư mục public
app.use(express.static('public'));

// Thiết lập global socket
const redT = expressWs.getWss();
process.redT = redT;
global['redT'] = redT;
global['userOnline'] = 0;

// Kết nối MongoDB (CHUẨN hóa phần này)
const configDB = require('./config/database');

// Lưu ý: KHÔNG cần truyền options cũ nữa
mongoose.connect(configDB.url)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Load các cấu hình, routes, socket, game logic
require('./config/admin');
require('./app/Helpers/socketUser')(redT);
require('./routerHttp')(app, redT);
require('./routerCMS')(app, redT);
require('./routerSocket')(app, redT);
require('./app/Cron/taixiu')(redT);
require('./app/Cron/baucua')(redT);
require('./config/cron')();

// Start server
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("Server listening on port", port);
});
