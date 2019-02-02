import $ from 'jquery';

require('webpack-jquery-ui');
import '../css/styles.css';

/**
 * jtrello
 * @return {Object} [Publikt tillgänliga metoder som vi exponerar]
 */

const jtrello = (function() {
  "use strict"; 


  let DOM = {};

  function captureDOMEls() {
    DOM.$board = $('.board');
    DOM.$listDialog = $('#list-creation-dialog');
    DOM.$columns = $('.column');
    DOM.$lists = $('.list');
    DOM.$cards = $('.card');


    DOM.$newListButton = $('.new-list > .button.add-list');
    DOM.$deleteListButton = $('.list-header > button.delete');

    DOM.$addCardButton = $(' form.new-card > .button.add')
    DOM.$newCardForm = $('form.new-card');
    DOM.$deleteCardButton = $('.card > button.delete');
  }

  
  function bindEvents() {
    DOM.$newListButton.on('click', createList);
    DOM.$deleteListButton.on('click', deleteList);

    DOM.$newCardForm.on('submit', createCard);
    DOM.$deleteCardButton.on('click', deleteCard);
  }


  function createList() {
    
    event.preventDefault();
    console.log("This should create a new list");
    

  }


  function deleteList() {

    $(this).closest('.column').remove();

  }


  function createCard(event) {

    let cardInput = $("input:text").val();
    let liInput = $(`<li class="card">${cardInput}<button class="update"><i class="far fa-edit"></i></button> <button class="button delete"><i class="fas fa-trash-alt"></i></button</li>`);


    $(this).closest('.list-cards').prepend(liInput).effect("bounce", { times: 1 }, "slow" );

    createDialogs();
    liInput.find('.button.delete').on('click', deleteCard);

    event.preventDefault();
    datePicker();

  }

  function deleteCard() {

    $(this).parent().remove();
    
  }

  function dragDrop() {

  $(".list-cards").sortable({
    placeholder: 'placeholder',
    opacity: 0.7,
    connectWith: '.list-cards',
    items: '.card'
  });

  }

  function createTabs() {

    $("#tabs").tabs();

  }

  function createDialogs() {

    $("#dialog").dialog({
      title: "Update your card",
      autoOpen: false,
      modal: true,
      height: 300,
      width: 500,
      show: {
        effect: "fade",
        duration: 500
      },
      hide: {
        effect: "fade",
        duration: 500
      },
      buttons: {
        Cancel: function() {
        $(".card-content").empty();
        $(this).dialog("close");
      }
    }

    });

    createTabs();
    viewCard();

  }

  function datePicker() {

    $(".datepicker").datepicker();

  }

  function setNewDate() {

    $('.datepicker-new').datepicker();


  }
 

  function viewCard() {

    let currentDate = $('.datepicker').datepicker("getDate");

    $(".update").click(function() {
      $("#dialog").dialog("open");

      $(".card-content").append($("input:text").val());
      $(".card-content").append($(this).closest('.card').text());
      $(".datepicker-content").append(currentDate);

    })

  }

  function showCreateCard() {

    $(".toggle-button").click(function() {
      $(this).next().toggle("blind", 500);
    });

  }

  function setColorWidget() {

      $.widget("custom.colorize", {
     
        _create: function() {
          this.element
            .addClass( "colorizer" );
   
          this.changer = $("<button>", {
            text: "Change background color",
            "class": "colorize"
          })
          .appendTo(this.element)
          .button();

        this._on( this.changer, {
          click: "random"
        });
      },

      _refresh: function() {
        this.element.css( "background-color", "rgb(" +
          this.options.red +"," +
          this.options.green + "," +
          this.options.blue + ")"
        );
      },

      random: function( event ) {
        var colors = {
          red: Math.floor( Math.random() * 256 ),
          green: Math.floor( Math.random() * 256 ),
          blue: Math.floor( Math.random() * 256 )
        };
 
        if ( this._trigger( "random", event, colors ) !== false ) {
          this.option( colors );
        }
      },

      _setOptions: function() {
        this._superApply( arguments );
        this._refresh();
      }
    });
        $("#view-card").colorize();
    }
  
  

  function render() {}


  function init() {

    captureDOMEls();
    createTabs();
    createDialogs();
    dragDrop();
    showCreateCard();
    setColorWidget();
    datePicker();
    setNewDate();
 
    bindEvents();
  }


  return {
    init: init
  };
})();


$("document").ready(function() {
  jtrello.init();
});
