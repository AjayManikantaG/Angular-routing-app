/** @format */

const salesData = require("./sales");
const dealersData = require("./dealers");
const Joi = require("@hapi/joi");

// POST Dealer schema
const dealerSchema = Joi.object({
  dealer: Joi.number().integer().min(12122).max(99999).required(),
  dealerName: Joi.string().required(),
  dealerRegion: Joi.string().required(),
  district: Joi.string().required(),
});

// POST Sales schema
const salesSchema = Joi.object({
  dealer: Joi.number().integer().min(10000).max(99999).required(),
  id: Joi.number().integer().required(),
  vin: Joi.string().alphanum().required(),
  retailDate: Joi.string().required(),
  saleStatus: Joi.string().required(),
});

// PUT & DELETE Dealer schema
const dealerSchema1 = Joi.object({
  dealerName: Joi.string().required(),
  dealerRegion: Joi.string().required(),
  district: Joi.string().required(),
});

// PUT & DELETE Sales schema
const salesSchema1 = Joi.object({
  vin: Joi.string().alphanum().required(),
  retailDate: Joi.string().required(),
  saleStatus: Joi.string().required(),
});

const getDealersData = (req, res) => {
  if (dealersData) {
    res.status(200).send(dealersData);
  } else {
    res.status(404).send("<h1>Data not found</h1>");
  }
};

const getSalesData = (req, res) => {
  if (salesData) {
    res.status(200).send(salesData);
  } else {
    res.status(404).send("<h1>Data not found</h1>");
  }
};

const getTotalSales = (req, res) => {
  const totalSales = calculateSales();
  if (totalSales) {
    res.status(200).send(totalSales);
  } else {
    res.status(404).send("Unable to fetch data");
  }
};

const getTotalSalesFromDealer = (req, res) => {
  const totalSales = calculateSales();
  const dealerIndex = totalSales.findIndex((d) => {
    return d.dealer === parseInt(req.params.dealer);
  });
  if (dealerIndex === -1) {
    res.status(404).send("dealer not found");
  } else {
    res.status(200).send(totalSales[dealerIndex]);
  }
};

const postDealerData = (req, res) => {
  const dealerIndex = dealersData.findIndex((d) => {
    return d.dealer === req.body.dealer;
  });

  if (dealerIndex !== -1) {
    res.status(403).send("Duplicating dealer Id is forbidden");
    return;
  }

  let isValid = dealerSchema.validate(req.body);

  if (isValid.error) {
    res.status(404).send(isValid.error.details[0].message);
  } else {
    dealersData.push(isValid.value);
    res
      .status(200)
      .send(`Data inserted successfully\n ${JSON.stringify(dealersData)}`);
  }
};

const postSalesData = (req, res) => {
  let isValid = salesSchema.validate(req.body);

  if (isValid.error) {
    res.status(404).send(isValid.error.details[0].message);
  } else {
    salesData.push(isValid.value);
    res
      .status(200)
      .send(`Data inserted successfully\n ${JSON.stringify(isValid.value)}`);
  }
};

const updateDealersData = (req, res) => {
  const dealerIndex = dealersData.findIndex((d) => {
    return d.dealer === parseInt(req.params.dealer);
  });

  if (dealerIndex === -1) {
    res.status(404).send("Can't find the dealer");
    return;
  }

  let isValid = dealerSchema1.validate(req.body);

  if (isValid.error) {
    res.status(404).send(isValid.error.details[0].message);
  } else {
    dealersData[dealerIndex] = {
      dealer: req.params.dealer,
      dealerName: req.body.dealerName,
      dealerRegion: req.body.dealerRegion,
      district: req.body.district,
    };
    res
      .status(200)
      .send(`Data Updated successfully\n ${JSON.stringify(dealersData)}`);
  }
};

const updateSalesData = (req, res) => {
  const salesIndex = salesData.findIndex((d) => {
    return (
      d.dealer === parseInt(req.params.dealer) &&
      d.id === parseInt(req.params.id)
    );
  });

  if (salesIndex === -1) {
    res.status(404).send("Dealer or Id not found");
    return;
  }

  let isValid = salesSchema1.validate(req.body);

  if (isValid.error) {
    res.status(404).send(isValid.error.details[0].message);
  } else {
    salesData[salesIndex] = {
      dealer: req.params.dealer,
      id: req.params.id,
      vin: req.body.vin,
      retailDate: req.body.retailDate,
      saleStatus: req.body.saleStatus,
    };

    res
      .status(200)
      .send(
        `Data Updated successfully \n ${JSON.stringify(salesData[salesIndex])}`
      );
  }
};

const deleteDealersData = (req, res) => {
  const dealerIndex = dealersData.findIndex((d) => {
    return d.dealer === parseInt(req.params.dealer);
  });

  if (dealerIndex === -1) {
    res.status(404).send("Can't find the dealer");
    return;
  }

  dealersData.splice(dealerIndex, 1);
  res
    .status(200)
    .send(`Data Deleted successfully\n ${JSON.stringify(dealersData)}`);
};

const deleteSalesData = (req, res) => {
  const salesIndex = salesData.findIndex((d) => {
    return (
      d.dealer === parseInt(req.params.dealer) &&
      d.id === parseInt(req.params.id)
    );
  });

  if (salesIndex === -1) {
    res.status(404).send("Dealer or Id not found.");
    return;
  }

  const deletedSale = salesData.splice(salesIndex, 1);
  res
    .status(200)
    .send(`Data Deleted successfully\n${JSON.stringify(deletedSale)}`);
};

// This function calculates the no of sales happened from the dealers
let calculateSales = () => {
  let totalSales = [];

  for (let dealers of dealersData) {
    let dealer = dealers.dealer;
    let salesNo = 0;

    if (dealer) {
      for (let sale of salesData) {
        if (dealer === sale.dealer && sale.saleStatus === "SOLD") {
          salesNo = salesNo + 1;
        }
      }
      totalSales.push({
        dealer: dealer,
        dealerName: dealers.dealerName,
        dealerRegion: dealers.dealerRegion,
        totalSales: salesNo,
      });
    }
  }
  return totalSales;
};

module.exports = {
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
};
