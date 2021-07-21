function createInvoice(services = {}) {
  return {
    phone: services.phone || 3000,
    internet: services.internet || 5500,
    payments: [],

    total: function () {
      return this.phone + this.internet;
    },

    addPayment: function(payment) {
      this.payments.push(payment);
    },

    addPayments: function(multiplePayments) {
      multiplePayments.forEach(this.addPayment, this) // this?
    },

    amountPaid: function () {
      return this.payments.reduce((totalPaid, payment) => totalPaid + payment.total(), 0);
    },

    amountDue: function () {
      return this.total() - this.amountPaid();
    },
  }
}

function createPayment(services = {}) {
  return {
    phonePaid: services.phone || 0,
    internetPaid: services.internet || 0,
    amountPaid: services.amount,

    total: function () {
      return this.amountPaid || this.phonePaid + this.internetPaid;
    }
  }
}

// Test 3
let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000 });

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
console.log(invoice.amountDue());       // this should return 0