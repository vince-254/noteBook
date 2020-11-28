import { Template } from 'meteor/templating';
import EditorJS from '@editorjs/editorjs';
import { Tracker } from 'meteor/tracker'
import './main.html';
import './noteBook.html';
import List from '@editorjs/list';
import '../lib/collections.js';
import '../lib/router.js';
import '../shared/main.js';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

// subscribe to read data
Meteor.subscribe("documents");

Accounts.ui.config({
  passwordSignupFields:  'USERNAME_AND_EMAIL'
});
Template.output.helpers({
  userName:function() {
    var person = Meteor.user();
    return person;
  },
  documents:function() {
    doc = Documents.find().fetch();
    console.log(doc);
    return doc;
  },
});

Template.output.events({
  "click #item":function(event){
    // var docId = Session.get("docid");
    // $(event.target).closest('#item').attr("data-id");
    // var doc = Documents.find({_id:docId}).fetch();
    // console.log(doc[0].body);  
    // console.log(doc[0]._id);
    // editor.render(doc[0].body);
  },
  // "click #newDoc":function(event){
  //   Session.set("docid", null);
  // },
});
Template.info.events({
  
}
);
///Saving a doc////
Template.editor.events({
  "click #saveButton": async function(event){
    event.preventDefault();
    var mode = Session.get("mode");
    var title = $('#title-text-input').val();
    // var title = "Sample4 Doc";

    body = await editor.save();

    // editor.save().then((outputData) => {
    //   body = outputData;
    //   console.log('Article data: ', outputData)
    // }).catch((error) => {
    //   console.log('Saving failed: ', error)
    // });
    // console.log(body);
    if (mode == "create") {
      Meteor.call('addDocument',title, body, function(){
        console.log('addDocument called' + title + body);
      });
    } else {
      var id = Session.get("docid");
      Meteor.call('updateDocument', id, title, body, function(){
        console.log('updateDocument called', id, + title + body);
      });
    }
    
    return false;
    
  },
  "click .refresh":function(event){
    editor.render(
      {
        blocks: [
          {
            type: "image",
            data: {
              url: "https://cdn.pixabay.com/photo/2017/09/01/21/53/blue-2705642_1280.jpg"
            }
          },
          {
            type: "header",
            data: {
               text: "New header",
               level: 2
            }
          }
        ]
      }
    );
  },

  "click #deleteButton": function () {
    var id = Session.get("docid");
      Meteor.call('deleteDocument', id, function(){
        console.log('deleteDocument called', id);
      });
  },
}
);


Template.editor.onRendered(function(){
  const Header = require('@editorjs/header');
  const SimpleImage = require('@editorjs/simple-image');
  const LinkTool = require('@editorjs/link');
  const RawTool = require('@editorjs/raw');
  const Checklist = require('@editorjs/checklist');
  const Quote = require('@editorjs/quote');
  const Warning = require('@editorjs/warning');
  const Marker = require('@editorjs/marker');
  const CodeTool = require('@editorjs/code');
  const Delimiter = require('@editorjs/delimiter');
  const InlineCode = require('@editorjs/inline-code');
  const Embed = require('@editorjs/embed');
  const Table = require('@editorjs/table');



  editor = new EditorJS({
    /**
     * Enable/Disable the read only mode
     */
    readOnly: false,

    /**
     * Wrapper of Editor
     */
    holder: 'editorjs',

    /**
     * Common Inline Toolbar settings
     * - if true (or not specified), the order from 'tool' property will be used
     * - if an array of tool names, this order will be used
     */
    // inlineToolbar: ['link', 'marker', 'bold', 'italic'],
    // inlineToolbar: true,

    /**
     * Tools list
     */
    tools: {
      /**
       * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
       */
      header: {
        class: Header,
        inlineToolbar: ['marker', 'link'],
        config: {
          placeholder: 'Header'
        },
        shortcut: 'CMD+SHIFT+H'
      },

      /**
       * Or pass class directly without any configuration
       */
      image: SimpleImage,

      list: {
        class: List,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+L'
      },

      checklist: {
        class: Checklist,
        inlineToolbar: true,
      },

      quote: {
        class: Quote,
        inlineToolbar: true,
        config: {
          quotePlaceholder: 'Enter a quote',
          captionPlaceholder: 'Quote\'s author',
        },
        shortcut: 'CMD+SHIFT+O'
      },

      warning: Warning,

      marker: {
        class:  Marker,
        shortcut: 'CMD+SHIFT+M'
      },

      code: {
        class:  CodeTool,
        shortcut: 'CMD+SHIFT+C'
      },

      delimiter: Delimiter,

      inlineCode: {
        class: InlineCode,
        shortcut: 'CMD+SHIFT+C'
      },

      linkTool: LinkTool,

      embed: Embed,

      table: {
        class: Table,
        inlineToolbar: true,
        shortcut: 'CMD+ALT+T'
      },

    },

    /**
     * This Tool will be used as default
     */
    // defaultBlock: 'paragraph',

    /**
     * Initial Editor data
     */
    // data: {},
    onReady: async function(){
      var docId = Session.get("docid");
    // $(event.target).closest('#item').attr("data-id");
    if (docId) {
      console.log(docId);
      var doc = await Documents.find({_id:docId}).fetch();
      console.log("on Ready doc" + doc[0].title);
      console.log(doc[0].body);  
      console.log(doc[0]._id);
      var title = doc[0].title;
      $("#title-text-input").val(title);
      editor.render(doc[0].body);
    }
    
    },
    onChange: function() {
      console.log('something changed');
    }
  })
    console.log('DOM is ready');
    return false;
});

Template.editor.helpers({
  editing: function() {
    var editingMode;
    if (Session.get("mode") == "edit") {
      editingMode = true;
      console.log('edit is true');
    } else {
      editingMode = false;
      console.log('edit is false');
    }
    return editingMode;
  }
});