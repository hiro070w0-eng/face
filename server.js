require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const jobRoute = require("./routes/job");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/job", jobRoute);
app.use("/tickets", jobRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Face running on " + PORT));