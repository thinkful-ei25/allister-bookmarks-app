'use strict';

console.log('workign');
function handleAdd() {
  $('#js-add').submit(function(event) {
    event.preventDefault();
  });
}

$(handleAdd);