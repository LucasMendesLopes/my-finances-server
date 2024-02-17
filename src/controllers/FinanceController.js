import { FinanceSchema } from "../models/index.js";
import { defaultInternalErrorMessage } from "../constant/index.js";
import { formatNumber } from "../utils/index.js";

export const financeController = {
  register: async (req, resp) => {
    try {
      const { date, description, type, value, userId } = req.body;

      await FinanceSchema.create({
        date: new Date(date).getTime() / 1000,
        description,
        type,
        value,
        userId,
      });

      return resp
        .status(201)
        .send({ message: "Finança cadastrada com sucesso." });
    } catch (error) {
      resp.status(500).send({
        message: defaultInternalErrorMessage,
      });
    }
  },
  getFinances: async (req, resp) => {
    try {
      const { userId } = req.params;

      const finances = await FinanceSchema.find({ userId });

      let inflows = 0;
      let outflows = 0;

      const formattedFinances = finances.map((finance) => {
        const formattedDate = new Date(finance.date * 1000).toLocaleDateString(
          "pt-BR"
        );

        if (finance.type === "entrada") inflows += finance.value;
        else if (finance.type === "saida") outflows += finance.value;

        return {
          ...finance.toObject(),
          date: formattedDate,
        };
      });

      let total = inflows - outflows;

      resp.status(200).send({
        finances: formattedFinances,
        inflows: formatNumber(inflows),
        outflows: formatNumber(outflows),
        total: formatNumber(total),
      });
    } catch (error) {
      resp.status(500).send({
        message: defaultInternalErrorMessage,
      });
    }
  },
  deleteFinance: async (req, resp) => {
    try {
      const { financeId } = req.params;

      const _id = financeId;

      await FinanceSchema.deleteOne({ _id });

      resp.status(200).send({
        message: "Finança deletada com sucesso.",
      });
    } catch (error) {
      resp.status(500).send({
        message: defaultInternalErrorMessage,
      });
    }
  },
};
