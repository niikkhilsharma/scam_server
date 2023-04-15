const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/send-otp", async (req, res) => {
  const { mobileNumber, numberOfOtps } = req.body;

  let otps = [];

  // Generate OTPs
  for (let i = 0; i < numberOfOtps; i++) {
    otps.push(Math.floor(100000 + Math.random() * 900000)); // 6-digit OTP
  }

  // Send OTPs
  const response = await axios.post(
    "https://learning.motion.ac.in/motioneducation/api/user/send-otp",
    {
      mobile_number: mobileNumber,
      no_of_otp: numberOfOtps,
      otp: otps,
    }
  );

  res.json({ message: response.data.message, otp: otps });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
