import express from "express";
import { Zarlaga } from "@/models/Zarlaga";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(403).send();
});

router.get("/getZarlaga", async (_, res) => {
  const budgets = await Zarlaga.find();
  const formatted = budgets.map((d) => ({
    _id: d._id,
    zarlaga: d.zarlaga,
  }));
  res.status(200).send({ result: formatted, success: true });
});

router.post("/addZarlaga", async (req, res) => {
  if (!req.body.zarlaga) {
    return res
      .status(200)
      .send({ result: "Зарлагаа оруулна уу.", success: false });
  }

  const budget = new Zarlaga({
    zarlaga: req.body.zarlaga,
  });

  await budget.save();

  return res.status(200).send({
    result: budget,
    message: "Амжилттай бүртгэгдлээ.",
  });
});

router.post("/deleteZarlaga", async (req, res) => {
  const { zarlagaId } = req.body;
  if (!zarlagaId) {
    return res
      .status(200)
      .send({ result: "zarlagaId-г оруулна уу.", success: false });
  }
  await Zarlaga.findByIdAndDelete({ _id: zarlagaId });
  res.status(200).send({
    result: zarlagaId,
    success: true,
  });
});

module.exports = router;
