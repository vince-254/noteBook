import '../lib/collections.js';
// code that is shared between client and server, i.e. sent to both

// method definitions

Meteor.methods({
    addDocument:function(title, body) {
        if(1>0){//logged in user
            doc = {
                owner:this.userId,
                createdOn:new Date(),
                title:title,
                body:body
            };
            return Documents.insert(doc);
        }
    },
}

);