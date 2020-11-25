import { Mongo } from 'meteor/mongo';
// code sent to client and server
// which gets loaded before anything else (since it is in the lib folder)

 Documents = new Mongo.Collection("documents");
