/** @format */
const express = require("express");
const app = express();
const {
  getDealersData,
  getSalesData,
  getTotalSales,
  getTotalSalesFromDealer,
  postDealerData,
  postSalesData,
  updateDealersData,
  updateSalesData,
  deleteDealersData,
  deleteSalesData,
} = require("./routes");

// Enabling cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Middleware for parsing
app.use(express.json());

// Get request for dealer-data
app.get("/dealers-data", getDealersData);

// Get request for sales-data
app.get("/sales-data", getSalesData);

// Total Sales
app.get("/total-sales", getTotalSales);

app.get("/total-sales/:dealer", getTotalSalesFromDealer);

// Post request for dealers-data
app.post("/dealers-data", postDealerData);

// Post request for sales-data
app.post("/sales-data", postSalesData);

// Update request for dealers-data
app.put("/dealers-data/:dealer", updateDealersData);

// Update request for sales-data
app.put("/sales-data/:dealer/:id", updateSalesData);

// Delete request for dealers-data
app.delete("/dealers-data/:dealer", deleteDealersData);

// Delete request for sales-data
app.delete("/sales-data/:dealer/:id", deleteSalesData);

app.listen(process.env.PORT || 3000, () =>
  console.log("Listening on port 3000")
);
