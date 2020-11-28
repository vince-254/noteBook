import '../lib/collections.js';
// code that is shared between client and server, i.e. sent to both

// method definitions

Meteor.methods({
    addDocument:function(title, body) {
        if(this.userId){//logged in user
            doc = {
                owner: Meteor.users.findOne({ _id: Meteor.userId() }).username,
                createdOn:new Date(),
                title:title,
                body: body
            };
            return Documents.insert(doc);
        } else {
            alert("You need to login to create a document");
        }
    },
    updateDocument:function(id, title, body) {
        if(this.userId){//logged in user
            // var doc = Documents.find({_id:id}).fetch();
            return Documents.update({_id:id}, {
                title: title,
                body: body
            });
        } 
        // else {
        //     alert("You need to login to update a document");
        // }
    },

    deleteDocument:function(id) {
        if(this.userId){//logged in user
            // var doc = Documents.find({_id:id}).fetch();
            return Documents.remove({_id:id});
        } 
        // else {
        //     alert("You need to login to update a document");
        // }
    },
}

);