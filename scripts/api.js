'use strict';

const api = (function() {
  
  const BASE_URL =  'https://thinkful-list-api.herokuapp.com/allister';

  const createItem = function(itemData, ifError, callback) {
    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/JSON',
      data: itemData,
      success: callback,
      error: ifError
    });
  };
  return {
    createItem
  }


}());

