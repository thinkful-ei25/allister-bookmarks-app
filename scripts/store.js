'use strict';

const store = (function() {

  const addItem = function(item) {
    this.items.push(item);
  };

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };

  return {
    items: [],
    addItem,
    focus: null,
    findById
  };

}());