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
});
Template.info.events({
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
}
);
///Saving a doc////
Template.editor.events({
  "click #saveButton": async function(event){
    event.preventDefault();
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
    Meteor.call('addDocument',title, body, function(){
      console.log('addDocument called' + title + body);
    });
    return false;
    
  }
});


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
    // data: {
    //   blocks: [
    //     {
    //       type: "header",
    //       data: {
    //         text: "Editor.js",
    //         level: 2
    //       }
    //     },
    //     {
    //       type : 'paragraph',
    //       data : {
    //         text : 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.'
    //       }
    //     },
    //     {
    //       type: "header",
    //       data: {
    //         text: "Key features",
    //         level: 3
    //       }
    //     },
    //     {
    //       type : 'list',
    //       data : {
    //         items : [
    //           'It is a block-styled editor',
    //           'It returns clean data output in JSON',
    //           'Designed to be extendable and pluggable with a simple API',
    //         ],
    //         style: 'unordered'
    //       }
    //     },
    //     {
    //       type: "header",
    //       data: {
    //         text: "What does it mean «block-styled editor»",
    //         level: 3
    //       }
    //     },
    //     {
    //       type : 'paragraph',
    //       data : {
    //         text : 'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\"cdx-marker\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.'
    //       }
    //     },
    //     {
    //       type : 'paragraph',
    //       data : {
    //         text : `There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.`
    //       }
    //     },
    //     {
    //       type: "header",
    //       data: {
    //         text: "What does it mean clean data output",
    //         level: 3
    //       }
    //     },
    //     {
    //       type : 'paragraph',
    //       data : {
    //         text : 'Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below'
    //       }
    //     },
    //     {
    //       type : 'paragraph',
    //       data : {
    //         text : `Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.`
    //       }
    //     },
    //     {
    //       type : 'paragraph',
    //       data : {
    //         text : 'Clean data is useful to sanitize, validate and process on the backend.'
    //       }
    //     },
    //     {
    //       type : 'delimiter',
    //       data : {}
    //     },
    //     {
    //       type : 'paragraph',
    //       data : {
    //         text : 'We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make its core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏'
    //       }
    //     },
    //     {
    //       type: 'image',
    //       data: {
    //         url: 'assets/onepiece.jpg',
    //         caption: '',
    //         stretched: false,
    //         withBorder: true,
    //         withBackground: false,
    //       }
    //     },
    //   ]
    // },
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
