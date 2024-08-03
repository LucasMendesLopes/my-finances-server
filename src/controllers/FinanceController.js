import { Finance } from "../models/index.js";
import { defaultInternalErrorMessage } from "../constant/index.js";
import { formatNumber } from "../utils/index.js";

export const financeController = {
  register: async (req, resp) => {
    try {
      const { date, description, value, category, userId } = req.body;

      await Finance.create({
        date: new Date(date).getTime() / 1000,
        description,
        value,
        category,
        userId,
      });

      return resp
        .status(201)
        .send({ message: "Finança cadastrada com sucesso" });
    } catch (error) {
      resp.status(500).send({
        message: defaultInternalErrorMessage,
      });
    }
  },
  getFinances: async (req, resp) => {
    try {
      const { userId } = req.params;
      const { yearAndMonth, description, page } = req.query;
      const itemsPerPage = 10;

      const [year, month] = yearAndMonth.split("-");
      const targetDate = new Date(parseInt(year), parseInt(month) - 1, 1);

      const startDate = new Date(
        targetDate.getFullYear(),
        targetDate.getMonth(),
        1
      );

      const endDate = new Date(
        targetDate.getFullYear(),
        targetDate.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      );

      const allFinances = await Finance.find({
        userId,
        date: {
          $gte: startDate.getTime() / 1000,
          $lte: endDate.getTime() / 1000,
        },
      });

      let inflows = 0;
      let outflows = 0;

      allFinances.forEach((finance) => {
        if (finance.category.type === "entrada") inflows += finance.value;
        else if (finance.category.type === "saida") outflows += finance.value;
      });

      let finances = allFinances;

      if (description) {
        const regex = new RegExp(description, 'i');
        finances = allFinances.filter(finance => regex.test(finance.description));
      }

      const formattedFinances = finances.map((finance) => {
        const formattedDate = new Date(finance.date * 1000).toLocaleDateString(
          "pt-BR"
        );

        return {
          ...finance.toObject(),
          value: formatNumber(finance.value),
          date: formattedDate,
        };
      });

      let total = inflows - outflows;

      const sortedFinances = formattedFinances.sort((a, b) => {
        const dateA = new Date(a.date.split("/").reverse().join("/"));
        const dateB = new Date(b.date.split("/").reverse().join("/"));
        return dateB - dateA;
      });

      const totalItems = sortedFinances.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      const currentPage = parseInt(page) || 1;

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedFinances = sortedFinances.slice(startIndex, endIndex);

      resp.status(200).send({
        finances: paginatedFinances,
        currentPage,
        totalPages,
        itemsPerPage,
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
  editFinance: async (req, resp) => {
    try {
      const { date, description, value, category } = req.body;
      const { financeId } = req.params;

      const _id = financeId;

      await Finance.updateOne(
        { _id },
        {
          $set: {
            date: new Date(date).getTime() / 1000,
            description,
            value,
            category
          },
        }
      );

      resp.status(200).send({
        message: "Finança editada com sucesso",
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

      await Finance.deleteOne({ _id });

      resp.status(200).send({
        message: "Finança deletada com sucesso",
      });
    } catch (error) {
      resp.status(500).send({
        message: defaultInternalErrorMessage,
      });
    }
  },
};
