export const maxUploadImg = 10;

export const starRatingArr = [1, 2, 3, 4, 5];

export const detailedItemStatusOptions = {
    Active:["Edit", "Hide", "Delete"],
    Sold: ["Change to active", "Edit", "Hide", "Delete"],
    Hidden: ["Edit", "Delete"]
  }
  
  export const alertOptions = {
    Hide: {
      message: "Other users won't be able to see your post. Hide post?",
      options:["Cancel", "Hide"],
      actions:["cancel", "hide-confirmed"]
    },
    Unhide: {
      message: "Post unhidden",
      options:["Cancel", "Unhide"],
      actions:["Cancel", "Confirmed-Unhide"]
    },
    Delete:{
      message: "Are you sure you want to delete this post?",
      options:["Cancel", "DELETE"],
      actions:["Cancel", "Confirm-Delete"]
    },
  }