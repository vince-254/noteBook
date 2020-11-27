import '../client/main.html';
import '../client/noteBook.html';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';


// FlowRouter.route('/',{
//     name: 'home',
//     action() {
//         BlazeLayout.Render('MainLayout');
//     }
// });

// FlowRouter.route('/editor',{
//     name: 'editor',
//     action() {
//         BlazeLayout.Render('MainLayout', {main: 'editor'});
//     }
// });
FlowRouter.route('/', {
    name: 'home',
    action() {
      // Do something here
      // After route is followed
      this.render('mainPage');
    }
  });
  FlowRouter.route('/newDoc', {
    name: 'editor',
    action() {
      // Do something here
      // After route is followed
      this.render('editor');
    }
  });
  FlowRouter.route('/documents/:_id', {
    name: 'document',
    action() {
      // Do something here
      // After route is followed
      var urlParam = FlowRouter.getParam('_id');
    //   console.log("The param" + urlParam);
      Session.set("docid", urlParam);
    //   console.log("The session" + Session.get("docid"));
      this.render('editor');
    }
  });