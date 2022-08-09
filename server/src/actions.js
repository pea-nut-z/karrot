import { Restriction, Account } from "./model/index.js";

export const getDocs = async (filters, restrictions, categories) => {
  let docs, query;

  switch (filters) {
    case "Block/Hide/Category":
      query = {
        $and: [
          { _id: { $nin: [mongoose.Types.ObjectId(privateId)] } },
          { id: { $nin: restrictions.blockBy } },
          { id: { $nin: restrictions.hide } },
          { id: { $nin: restrictions.block } },
        ],
      };
      docs = await Account.aggregate([
        { $match: query },
        { $unwind: "$items" },
        { $match: { "items.category": { $in: categories } } },
      ]);
      break;
    default:
      // filters out accounts that have blocked me
      query = {
        $and: [
          { _id: { $nin: [mongoose.Types.ObjectId(privateId)] } },
          { id: { $nin: restrictions.blockBy } },
        ],
      };
      docs = await Account.aggregate([{ $match: query }, { $unwind: "$items" }]);
  }
  return docs;
};
