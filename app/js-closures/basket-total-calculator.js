// 5. Basket Total Calculator with Retained Tax Rate 🛒
// Goal: Emulate the core problem's scenario. Create a function that sets a tax rate (rate). The returned function takes a subtotal and returns the final total, using the retained tax rate.

const makeTaxCalculator = function (tax) {
  const calculator = function (subtotal) {
    const taxFee = subtotal * tax;
    const total = subtotal + taxFee;
    return total;
  };
  return calculator;
};

const taxCalculator = makeTaxCalculator(0.1);

// should be subtotal 30 + 3 = 33 total with tax
const total = taxCalculator(30);
console.log(`Is total: ${total}`);
