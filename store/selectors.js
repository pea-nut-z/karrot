import { createSelector } from "reselect";

// ALL MEMBERS'LISTINGS
// excluding current user's items
// by user's customized feed and block/hide restructions
export const selectListings = () =>
  createSelector(
    (userId) => userId,
    (_, listings) => listings,
    (_, __, members) => members,
    (userId, __, ____, restrictions) => restrictions[userId],
    (userId, listings, members, restriction) => {
      const arr = [];
      for (let sellerId in listings) {
        sellerId = parseInt(sellerId);
        if (sellerId === userId) continue;
        if (restriction.block.includes(sellerId)) continue;
        if (restriction.hide.includes(sellerId)) continue;
        for (let itemId in listings[sellerId]) {
          if (!listings[sellerId][itemId]["status"]) continue; // SKIP DRAFTS
          itemId = parseInt(itemId);
          const item = {
            sellerId,
            itemId,
            ...members[sellerId],
            ...listings[sellerId][itemId],
          };
          arr.push(item);
        }
      }
      arr.sort((a, b) => new Date(a.date) < new Date(b.date));
      return arr;
    }
  );

export const filterListings = (userId, listings, members, restrictions) =>
  createSelector(
    selectListings(userId, listings, members, restrictions),
    (_, listings) => listings,
    (_, __, members) => members,
    (_, __, ____, restrictions) => restrictions,
    (userId, __, ___, ____, feeds) => feeds[userId],
    (_, __, ___, ____, _____, filter) => filter,
    (_, __, ___, ____, _____, ______, value) => value,
    (items, __, ___, ____, feed, filter, value) => {
      switch (filter) {
        case "feed":
          return items.filter((item) => feed.includes(item.category) && item.status === "Active");
        case "category":
          return items.filter((item) => item.category === value && item.status === "Active");
        case "string":
          const words = value.split(" ");
          let exp = words.map((word) => {
            return "\\b" + word + "\\b";
          });
          exp = exp.join("|");
          const regex = new RegExp(exp, "i");
          return items.filter((item) => {
            return (
              item.title.match(regex) || item.description.match(regex) || item.category.match(regex)
            );
          });
        default:
          new Error(`Unknown filter: ${filter}`);
      }
    }
  );

export const furtherFilterListings = (
  userId,
  listings,
  members,
  restrictions,
  feeds,
  initialFilter,
  value
) =>
  createSelector(
    filterListings(userId, listings, members, restrictions, feeds, initialFilter, value),
    (_, listings) => listings,
    (_, __, members) => members,
    (_, __, ___, restrictions) => restrictions,
    (_, __, ___, ____, feeds) => feeds,
    (_, __, ___, ____, _____, initialFilter) => initialFilter,
    (_, __, ___, ____, _____, ______, value) => value,
    (_, __, ___, ____, _____, ______, _______, furtherFilters) => furtherFilters,
    (items, listings, members, restrictions, feeds, initialFilter, value, furtherFilters) => {
      if (items.length === 0) return;
      const { hideSoldItems, categories, minPrice, maxPrice, sort } = furtherFilters;

      // SOLD?
      if (hideSoldItems) {
        items = items.filter((item) => item.status !== "Sold");
        if (items.length === 0) return;
      }

      // CATEGORY?
      if (categories) {
        if (categories.length !== 0) {
          items = items.filter((item) => categories.includes(item.category));
          if (items.length === 0) return;
        }
      }

      // Sort?
      if (sort === "Relevance") {
        let searchWords = value.split(" ");
        items = items.map((item) => {
          let score = 0;
          searchWords.forEach((word) => {
            const exp = "\\b" + word + "\\b";
            const regex = new RegExp(exp, "i");
            item.category.match(regex) && ++score;
            item.description.match(regex) && ++score;
            item.title.match(regex) && ++score;
          });
          return { ...item, score };
        });
        return items.sort((a, b) => a.score < b.score);
      }

      if (sort === "Most recent") {
        items.sort((a, b) => new Date(a.date) < new Date(b.date));
      }

      // Price
      if (minPrice) {
        items = items.filter((item) => item.price >= minPrice);
        if (items.length === 0) return;
      }

      if (maxPrice) {
        items = items.filter((item) => item.price <= maxPrice);
        if (items.length === 0) return;
      }
      return items;
    }
  );

export const selectMembers = () =>
  createSelector(
    (state) => state.members,
    (members) => {
      const arr = [];
      for (let memberId in members) {
        // memberId = parseInt(memberId);
        const member = {
          memberId,
          ...members[memberId],
        };
        arr.push(member);
      }
      return arr;
    }
  );

export const filterMembers = (state) =>
  createSelector(
    selectMembers(state),
    (_, filter) => filter,
    (_, __, value) => value,
    (members, filter, value) => {
      const filteredMembers = members.filter((member) => {
        const string = value.trim();
        const regex = new RegExp(string, "i");
        return member.memberId.match(regex) || member.username.match(regex);
      });
      return filteredMembers.length === 0 ? null : filteredMembers;
    }
  );

// INDIVIDUAL MEMBER - ITEMS
export const selectMemberAllItems = () =>
  createSelector(
    (state, memberId) => state.listings[memberId],
    (_, memberId) => memberId,
    (items, memberId) => {
      const arr = [];
      for (const key in items) {
        const itemId = parseInt(key);
        if (!items[key]["status"]) continue; // SKIPS ALL DRAFTS
        const item = { ...items[key], itemId, sellerId: memberId };
        arr.push(item);
      }
      arr.sort((a, b) => new Date(a.date) < new Date(b.date));
      return arr;
    }
  );

export const filterMemberItems = (state, memberId) =>
  createSelector(
    selectMemberAllItems(state, memberId),
    (_, memberId) => memberId,
    (_, __, itemId) => itemId,
    (_, __, ___, filter) => filter,
    (items, memberId, itemId, filter) => {
      switch (filter) {
        case "four-other-items":
          return items.filter((item) => item.itemId !== itemId).slice(0, 4);
        case "active":
          return items.filter((item) => item.status === "Active");
        case "sold":
          return items.filter((item) => item.status === "Sold");
        case "hidden":
          return items.filter((item) => item.status === "Hidden");
        case "active-and-reserved":
          return items.filter((item) => item.status === "Active" || item.status === "Reserved");
        default:
          new Error(`Unknown filter: ${filter}`);
      }
    }
  );

// FAVOURITES
export const selectSellersAndListingsByFav = createSelector(
  (userFavs) => userFavs,
  (userFavs, members) => userFavs.map((fav) => members[fav.sellerId]),
  (userFavs, __, listings) => userFavs.map((fav) => listings[fav.sellerId][fav.itemId]),
  (userFavs, members, listings) => {
    return userFavs.map((fav, index) => ({
      ...fav,
      ...members[index],
      ...listings[index],
    }));
  }
);

// REVIEWS
export const selectReviews = createSelector(
  (reviews) => reviews,
  (reviews, members) => reviews.map((review) => members[review.reviewerId]),
  (reviews, memberInfo) => {
    return reviews.map((review, index) => {
      const name = memberInfo[index]["username"];
      const displayPic = memberInfo[index]["displayPic"];
      const location = memberInfo[index]["location"];
      return {
        ...review,
        name,
        displayPic,
        location,
      };
    });
  }
);
