import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import colors from 'colors';
import bodyParser from 'body-parser';
import { notFound, errorHandler } from "./middlewares/error.Middleware.js";
import connectDB from "./config/db.js";

//Import Routes
import usermanagement from "./routes/user.routes.js";
import commentsmanagement from "./routes/comments.routes.js";
import petshopmanagement from "./routes/petshop.routes.js";
import productmanagement from "./routes/product.routes.js";
import ordermanagement from "./routes/order.routes.js";
import orderproductmanagement from "./routes/orderproduct.routes.js";
import cartproductmanagement from "./routes/cart.routes.js";
import servicemanagement from "./routes/service.routes.js";
import petownermanagement from "./routes/petowners.routes.js";
import petmanagement from "./routes/pet.routes.js";
import pethospitalmanagement from "./routes/pethospital.routes.js";
import doctormanagement from "./routes/doctor.routes.js";
import appointmentmanagement from "./routes/appointment.routes.js";
import blogmanagement from "./routes/blog.routes.js";
import petrecordmanagement from "./routes/petRecord.routes.js";
import categorymanagement from "./routes/category.routes.js";
// import authRoute from "./controller/auth.controller.js";
import authenticationRoutes from "./routes/authentication.routes.js";

const app = express();

dotenv.config();
app.use(bodyParser.json());
app.use(cors());

connectDB();

//Route Middlewares
app.use("/api/v1/user", usermanagement);
app.use("/api/v1/comments", commentsmanagement);
app.use("/api/v1/petshop", petshopmanagement);
app.use("/api/v1/product", productmanagement);
app.use("/api/v1/order", ordermanagement);
app.use("/api/v1/orderproduct", orderproductmanagement);
// app.use("/api/v1/doctor", Usermanagement);
app.use("/api/v1/service", servicemanagement);
app.use("/api/v1/petowners", petownermanagement);
app.use("/api/v1/pet", petmanagement);
app.use("/api/v1/pethospital", pethospitalmanagement);
app.use("/api/v1/doctor", doctormanagement);
app.use("/api/v1/appointment", appointmentmanagement);
app.use("/api/v1/blog", blogmanagement);
// app.use("/api/v1/auth", authRoute);
app.use("/api/v1/cart", cartproductmanagement);
app.use("/api/v1/pet-record", petrecordmanagement);
app.use("/api/v1/category", categorymanagement);
app.use('/api/v1', authenticationRoutes);



if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4001;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue
      .underline.bold
  )
);
