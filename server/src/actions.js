import mongoose from "mongoose";
import { Restriction, Account, Review, Favourite, IReview } from "./model/index.js";
import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId({ length: 4 });
let privateId = "62e87ec387aecd786da8d937";

export const getDraft = async () => {
  const account = await Account.findOne({ privateId });
  return account.draft;
};

export const deleteDraft = async () => {
  const result = await Account.findOneAndUpdate({ privateId }, { draft: false });
  return result;
};

export const createDraft = async (draft) => {
  const result = await Account.findOneAndUpdate({ privateId }, { draft });
  return result;
};

export const getRestrictions = async () => {
  const restrictions = await Restriction.findOne({ privateId });
  return restrictions;
};

export const getAccounts = async () => {
  // exclude mine
  const listings = await Account.find({ id: { $nin: privateId } });
  return listings;
};

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

export const getHomeListings = async () => {
  const restrictions = await getRestrictions();
  return getDocs("Block/Hide/Category", restrictions, restrictions.feeds);
};
