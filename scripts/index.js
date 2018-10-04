'use strict';

$.fn.extend({
  serializeJson: function() {
    const formData = new FormData(this[0]);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    return JSON.stringify(o);
  }
});


console.log('workign');
function handleAdd() {
  $('#js-add').submit(function(event) {
    event.preventDefault();
    const newItemData = ($(event.target).serializeJson());
    console.log(newItemData);
    api.createItem(newItemData, console.log('error'), console.log('posted'));
  });
}

$(handleAdd);