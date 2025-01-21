const generateRandomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

exports.seed = async function (knex) {
  // First, delete existing entries
  await knex("transactions").del();

  // Create date range for the last 3 months
  const endDate = new Date();
  const startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 3, 1);

  // Generate transactions
  const transactions = [
    // Regular monthly income
    {
      amount: 5000.0,
      category: "Salary",
      description: "Monthly Salary",
      type: "income",
      date: new Date(2024, 0, 1), // January 1st, 2024
      status: "completed",
    },
    {
      amount: 5000.0,
      category: "Salary",
      description: "Monthly Salary",
      type: "income",
      date: new Date(2023, 11, 1), // December 1st, 2023
      status: "completed",
    },

    // Regular expenses
    {
      amount: 1500.0,
      category: "Bills & Utilities",
      description: "Monthly Rent",
      type: "expense",
      date: new Date(2024, 0, 5),
      status: "completed",
    },
    {
      amount: 200.0,
      category: "Bills & Utilities",
      description: "Electricity Bill",
      type: "expense",
      date: new Date(2024, 0, 10),
      status: "completed",
    },

    // Food & Dining
    {
      amount: 75.5,
      category: "Food & Dining",
      description: "Grocery Shopping - Whole Foods",
      type: "expense",
      date: generateRandomDate(startDate, endDate),
      status: "completed",
    },
    {
      amount: 45.0,
      category: "Food & Dining",
      description: "Restaurant - Italian Dinner",
      type: "expense",
      date: generateRandomDate(startDate, endDate),
      status: "completed",
    },

    // Transportation
    {
      amount: 50.0,
      category: "Transportation",
      description: "Monthly Transit Pass",
      type: "expense",
      date: new Date(2024, 0, 1),
      status: "completed",
    },
    {
      amount: 35.0,
      category: "Transportation",
      description: "Uber Ride",
      type: "expense",
      date: generateRandomDate(startDate, endDate),
      status: "completed",
    },

    // Shopping
    {
      amount: 120.0,
      category: "Shopping",
      description: "Winter Clothes",
      type: "expense",
      date: generateRandomDate(startDate, endDate),
      status: "completed",
    },
    {
      amount: 89.99,
      category: "Shopping",
      description: "Amazon Purchase",
      type: "expense",
      date: generateRandomDate(startDate, endDate),
      status: "completed",
    },

    // Entertainment
    {
      amount: 15.99,
      category: "Entertainment",
      description: "Netflix Subscription",
      type: "expense",
      date: new Date(2024, 0, 15),
      status: "completed",
    },
    {
      amount: 60.0,
      category: "Entertainment",
      description: "Concert Tickets",
      type: "expense",
      date: generateRandomDate(startDate, endDate),
      status: "completed",
    },

    // Healthcare
    {
      amount: 50.0,
      category: "Healthcare",
      description: "Pharmacy",
      type: "expense",
      date: generateRandomDate(startDate, endDate),
      status: "completed",
    },

    // Additional Income
    {
      amount: 500.0,
      category: "Freelance",
      description: "Web Development Project",
      type: "income",
      date: generateRandomDate(startDate, endDate),
      status: "completed",
    },

    // Investment
    {
      amount: 1000.0,
      category: "Investment",
      description: "Stock Market Investment",
      type: "income",
      date: generateRandomDate(startDate, endDate),
      status: "completed",
    },

    // Refund Example
    {
      amount: 89.99,
      category: "Shopping",
      description: "Returned Amazon Purchase",
      type: "refund",
      date: generateRandomDate(startDate, endDate),
      status: "completed",
    },
  ];

  // Insert transactions
  await knex("transactions").insert(transactions);
};
