'use strict';

$.fn.extend({
  serializeJson: function () {
    const formData = new FormData(this[0]);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    return JSON.stringify(o);
  }
});



function generateItemElement(item) {


  if (item.id === store.focus) {
    return `
    <li class="js-item-element" data-item-id="${item.id}">${item.title}: ${item.rating}, ${item.desc}, <a href="${item.url}">Visit</a>, <button class="js-delete">delete</button> 
    </li>`;
  }
  return `
  <li class="js-item-element" data-item-id="${item.id}">${item.title}: ${item.rating}
  </li>`;


}

function generateBookmarkString(bookmarkItems) {

  const items = bookmarkItems.map((item) => generateItemElement(item));
  return items.join('');

}

function render() {

  let items = store.items;

  const bookmarkItemsString = generateBookmarkString(items);

  $('.js-bookmarks').html(bookmarkItemsString);

}

function getItemIdFromElement(item) {
  return $(item)
    .closest('.js-item-element')
    .data('item-id');
}


function handleFocus() {
  $('.js-bookmarks').on('click', '.js-item-element', function (event) {
    
    console.log(event.target);
    const id = getItemIdFromElement(event.target);
    console.log(id);
    store.setFocus(id);
    console.log(store.focus);
    render();
  });
}


function handleDelete() {

  $('.js-bookmarks').on('click', '.js-delete', function (event) {
    const id = getItemIdFromElement(event.target);
    console.log(id);
    api.deleteItem(id, error => {
      console.log(error.responseJSON.message);
    }, function() {
      store.findAndDelete(id);
      console.log(store.items);
      
      render();
    });
  });
}


function handleAdd() {
  $('#js-add').submit(function (event) {
    event.preventDefault();
    const newItemData = ($(event.target).serializeJson());
    console.log(newItemData);
    api.createItem(newItemData, error => {
      console.log(error.responseJSON.message);
    }, (data) => {
      console.log(data);
      store.addItem(data);
      console.log(store.items)
      render();
    });
  });
}





$(document).ready(function () {

  api.getItems((items) => {
    console.log('items:', items);
    items.forEach((item) => store.addItem(item));
    console.log(store.items);
    render();
    handleFocus();
    handleDelete();
    handleAdd();
    // const item = store.items[0];
    // console.log('current name: ' + item.name);
    // store.findAndUpdate(item.id, { name: 'foobared' });
    // console.log('new name: ' + item.name);
  });
});