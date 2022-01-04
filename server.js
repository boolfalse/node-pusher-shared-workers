
require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname)));
const Pusher = require('pusher');

// Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const pusher = new Pusher({
	appId: process.env.PUSHER_APP_ID,
	key: process.env.PUSHER_APP_KEY,
	secret: process.env.PUSHER_APP_SECRET,
	cluster: process.env.PUSHER_APP_CLUSTER,
	encrypted: true
});

app.get('/', (req,res) => {  
	res.sendFile('index.html');
});

app.post('/send-message', (req, res) => {
	let reqData = req.body;

	pusher.trigger('channel_name', 'message', {
		message: reqData.message,
		type: 'ALERT',
	});

	res.status(200).send();
});

const port = process.env.APP_PORT || 5000;
app.listen(port, () => { console.log(`App listening on port ${port}!`)});
