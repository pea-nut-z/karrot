export const maxUploadImg = 10;

export const starRatingArr = [1, 2, 3, 4, 5];

export const detailedItemStatusOptions = {
    Active:["Edit", "Hide", "Delete"],
    Sold: ["Change to active", "Edit", "Hide", "Delete"],
    Hidden: ["Edit", "Delete"]
  }

export const getRestrictActions = (block,hide)=>{
    return block ? ["Report", "Unblock"] : ["Report", "Block", hide ? "Unhide" : "Hide"];
}

class ModalActions {
    post = {
        title : {
            message:()=> "Enter a title"
        },
        category : {
            message:()=> "Select a category"
        },
        description : {
            message:()=> "Enter a description"
        },
        descLength : {
            message:()=> "Tell us a bit more for description - minimum 20 characters"
        },
        draft : {
            message:()=> "You have a saved draft. Continue writing?",
            options:["Yes", "No"],
            actions: ["Use-Draft", "Remove-Draft"]
        },
        edit : {
            message:()=>"Quit editing post?",
            options:["No", "Yes"],
            actions: ["Cancel", "Exit"]
        },
    }

    listing = {
        Hide : {
            message:()=> "Other users won't be able to see your post. Hide post?",
            options: ["Cancel", "Hide"],
            actions: ["Cancel", "Confirm-Hide"]
        },
        Unhide : {
            message:()=> "Post unhidden",
            options: ["Cancel", "Unhide"],
            actions: ["Cancel", "Confirm-Unhide"]
        },
        Delete : {
            message: ()=> "Are you sure you want to delete this post?",
            options:["Cancel", "Delete"],
            actions: ["Cancel", "Confirm-Delete"]
        },
    }

    user = {
        Block : {
            message: (name)=> `Are you sure you want to block ${name}? Their posts won't be visible to you and they won't be able to chat with you.`,
            options:["Cancel", "Block"],
            actions: ["Cancel", "Blocked"]
        },
        Hide : {
            message:()=> `Hide ${this.member} and all of ${this.member}'s post ?`,
            options:["Cancel", "Hide"],
            actions: ["Cancel", "Hid"]
        },
        Unblock: {
            message:()=> `${this.member} was unblocked`
        },
        Hid: {
            message:()=> `${this.member}'s posts will no longer be visible to you`
        },
        Unhide: {
            message:()=>()=>`${this.member}'s posts have been unhidden`
        },
    }
    
}
  
export const modalActions = new ModalActions()