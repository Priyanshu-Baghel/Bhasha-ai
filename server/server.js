const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app =  express();
const path = require("path");
const authRoute = require("./router/Auth/authRouter");
const contactRoute = require("./router/contact/contactRouter");
const profileRoute =require('./router/Profile/profileRouter');
const emailRoute = require("./router/email/email-router");
const courseRoute = require("./router/course/courseRoute");
const ConnectDb = require("./utils/db");
const mediaRoutes = require("./router/media/media");
const AdminRoutes = require("./router/Admin/admin")
const paymentRoutes = require("./router/payment/paymentRoutes")
const subscriptionRoute = require("./router/Subscription/subscriptionRouter")

// const BASE_URI = process.env.Base


const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials : true
}

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/for", profileRoute);
app.use("/", emailRoute);
app.use("/", courseRoute);
app.use("/api/v1/media", mediaRoutes);
app.use("/api", paymentRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/Subscription", subscriptionRoute)
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req,res) => {
    res.status(200).send("welcome user landing page")
});

const PORT = process.env.PORT || 8000;

ConnectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});