import { Meteor } from 'meteor/meteor';
import '../lib/collections.js';
import '../shared/main.js';

Meteor.startup(() => {
  // code to run on server at startup
  if (!Documents.findOne()){// no documents yet!
    console.log('no docs');
} 
else {
  console.log(Documents.find().fetch());
}
});

Meteor.publish("documents", function(){
  return Documents.find();
})