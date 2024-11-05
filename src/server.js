const express = require("express");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
app.use(bodyParser.json());

const serviceAccount = JSON.parse(process.env.SERVICE_ACOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.post("/send-notification", async (req, res) => {
  const { tokens, senderName } = req.body;
  const message = {
    notification: {
      title: "Nueva solicitud de amistad",
      body: `${senderName} te ha enviado una solicitud de amistad.`,
    },
    tokens,
  };
});

app.get("/send-notification", async (req, res) => {
  const message = {
    notification: {
      title: "Nueva solicitud de amistad",
      body: ` te ha enviado una solicitud de amistad.`,
    },
  };
  console.log(message);
  res.status(200).json(message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
