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
