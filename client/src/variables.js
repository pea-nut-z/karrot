export const maxUploadImg = 10;

export const starRatingArr = [1, 2, 3, 4, 5];

export const detailedItemStatusOptions = {
    Active:["Edit", "Hide", "Delete"],
    Sold: ["Change to active", "Edit", "Hide", "Delete"],
    Hidden: ["Edit", "Delete"]
  }
  
export const alertOptions = {
    title: {
        message: "Enter a title"
    },
    category: {
        message: "Select a category"
    },
    description: {
        message: "Enter a description"
    },
    descLength: {
        message: "Tell us a bit more for description - minimum 20 characters"
    },
    draft: {
        message: "You have a saved draft. Continue writing?",
        options:["Yes", "No"],
        actions:["Yes", "No"]
    },
    editPost: {
        message:"Quit editing post?",
        options:["No", "Yes"],
        actions:["No", "Yes"]
    },
    Hide: {
      message: "Other users won't be able to see your post. Hide post?",
      options:["Cancel", "Hide"],
      actions:["Cancel", "Comfirm-Hide"]
    },
    Unhide: {
      message: "Post unhidden",
      options:["Cancel", "Unhide"],
      actions:["Cancel", "Confirm-Unhide"]
    },
    Delete:{
      message: "Are you sure you want to delete this post?",
      options:["Cancel", "Delete"],
      actions:["Cancel", "Confirm-Delete"]
    },
  }