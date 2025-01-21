const db = require("../config/database");

class Transaction {
  static async getAll() {
    return db("transactions").select("*").orderBy("date", "desc");
  }

  static async getByCategory() {
    return db("transactions")
      .select("category")
      .sum("amount as total")
      .count("* as count")
      .groupBy("category");
  }

  static async create(transaction) {
    return db("transactions").insert(transaction).returning("*");
  }

  static async processRefund(transactionId) {
    const transaction = await db("transactions")
      .where({ id: transactionId })
      .first();

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    return db.transaction(async (trx) => {
      // Create refund record
      await trx("transactions").insert({
        amount: -transaction.amount,
        category: transaction.category,
        description: `Refund for transaction ${transactionId}`,
        type: "refund",
        status: "completed",
      });

      // Update original transaction
      await trx("transactions")
        .where({ id: transactionId })
        .update({ status: "refunded" });
    });
  }
}

module.exports = Transaction;
