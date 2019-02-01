import $ from 'jquery';

require('webpack-jquery-ui');
import '../css/styles.css';

/**
 * jtrello
 * @return {Object} [Publikt tillgänliga metoder som vi exponerar]
 */

// Här tillämpar vi mönstret reavealing module pattern:
// Mer information om det mönstret här: https://bit.ly/1nt5vXP
const jtrello = (function() {
  "use strict"; // https://lucybain.com/blog/2014/js-use-strict/

  // Referens internt i modulen för DOM element
  let DOM = {};

  /* =================== Privata metoder nedan ================= */
  function captureDOMEls() {
    DOM.$board = $('.board');
    DOM.$listDialog = $('#list-creation-dialog');
    DOM.$columns = $('.column');
    DOM.$lists = $('.list');
    DOM.$cards = $('.card');

    
  
    DOM.$newListButton = $('button#new-list');
    DOM.$deleteListButton = $('.list-header > button.delete');

    DOM.$addCardButton = $(' form.new-card > .button.add')
    DOM.$newCardForm = $('form.new-card');
    DOM.$deleteCardButton = $('.card > button.delete');
  }

  function createTabs() {}
  function createDialogs() {}

  /*
  *  Denna metod kommer nyttja variabeln DOM för att binda eventlyssnare till
  *  createList, deleteList, createCard och deleteCard etc.
  */
  function bindEvents() {
    DOM.$newListButton.on('click', createList);
    DOM.$deleteListButton.on('click', deleteList);

    DOM.$newCardForm.on('submit', createCard);
    DOM.$deleteCardButton.on('click', deleteCard);
  }

  /* ============== Metoder för att hantera listor nedan ============== */
  function createList() {
    event.preventDefault();
    console.log("This should create a new list");

    $($)
  }

  function deleteList() {
    console.log("This should delete the list you clicked on");
  }

  /* =========== Metoder för att hantera kort i listor nedan =========== */

  function createCard(event) {

    let cardInput = $("input:text").val();
    console.log(cardInput);

    event.preventDefault();
    

  }

  function deleteCard() {

    $(this).parent().remove();    

  }
  
  /* =================== Metoder för jQuery ================== */

  function dragDrop() {

  $(".list-cards").sortable({
    placeholder: 'placeholder',
    opacity: 0.7,
    connectWith: '.list-cards',
    items: '.card'
  });

  }

  function datePicker() {

    $(".datepicker").datepicker();

  }

  function createTabs() {

  }

  function createDialogs() {

    $("#dialog").dialog({
      title: "Dialog message",
      autoOpen: false,
      modal: true,
      draggable: false,
      position: { 
        my: "left top", 
        at: "left bottom", 
        of: "button"
      }
    });

    $("#opener").click(function() {
      $("#dialog").dialog("open");
    });

    

  }

  // Metod för att rita ut element i DOM:en
  function render() {}

  /* =================== Publika metoder nedan ================== */

  // Init metod som körs först
  function init() {
    console.log(':::: Initializing JTrello!!!!3 ::::');
    // Förslag på privata metoder
    captureDOMEls();
    createTabs();
    createDialogs();
    dragDrop();
    datePicker();

    bindEvents();
  }

  // All kod här
  return {
    init: init
  };
})();

//usage
$("document").ready(function() {
  jtrello.init();
});
