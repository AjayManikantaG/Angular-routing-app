const salesData = require("./sales");
const { salesSchema } = require("./routes");
const postSalesData = (req, res) => {
  let isValid = salesSchema.validate(req.body);
  if (isValid.error) {
    res.status(404).send(isValid.error.details[0].message);
  }
  else {
    salesData.push(isValid.value);
    res.status(200).send(`Data inserted successfully\n ${isValid.value}`);
  }
};
