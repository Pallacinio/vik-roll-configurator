const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Zapis zamówienia
router.post("/", async (req, res) => {
  const { items, total } = req.body;

  if (!items || !total) {
    return res.status(400).json({ message: "Brak wymaganych danych" });
  }

  try {
    const newOrder = new Order({ items, total });
    await newOrder.save();
    res.status(201).json({ message: "Zamówienie zostało zapisane." });
  } catch (error) {
    res.status(500).json({ message: "Błąd serwera", error: error.message });
  }
});

// Pobieranie wszystkich zamówień
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Błąd serwera", error: error.message });
  }
});

module.exports = router;
