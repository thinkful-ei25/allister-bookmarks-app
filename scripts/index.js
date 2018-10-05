'use strict';

$(document).ready(function () {
  bookmarks.bindEventListeners();
  bookmarks.render();
  api.getItems((items) => {
    //console.log('items:', items);
    items.forEach((item) => store.addItem(item));
    //console.log(store.items);
    bookmarks.render();
    
    // const item = store.items[0];
    // console.log('current name: ' + item.name);
    // store.findAndUpdate(item.id, { name: 'foobared' });
    // console.log('new name: ' + item.name);
  });
});