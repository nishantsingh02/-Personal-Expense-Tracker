exports.seed = async function (knex) {
  // First, delete existing entries
  await knex("categories").del();

  // Insert categories
  await knex("categories").insert([
    { name: "Food & Dining", type: "expense" },
    { name: "Transportation", type: "expense" },
    { name: "Shopping", type: "expense" },
    { name: "Entertainment", type: "expense" },
    { name: "Bills & Utilities", type: "expense" },
    { name: "Healthcare", type: "expense" },
    { name: "Salary", type: "income" },
    { name: "Investment", type: "income" },
    { name: "Freelance", type: "income" },
  ]);
};
