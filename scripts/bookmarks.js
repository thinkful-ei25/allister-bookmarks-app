'use strict'

const bookmarks = (function () {

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
    <li tabindex="0" class="js-item-element" data-item-id="${item.id}"><span class="title-rating">${item.title}: ${'✪'.repeat(item.rating)}</span>
    <p class="desc"> ${item.desc} </p> <a class="url" href="${item.url}">Visit</a> <button class="js-delete">delete</button> 
    </li>`;
    }
    return `
  <li tabindex="0" class="js-item-element" data-item-id="${item.id}">${item.title}: ${'✪'.repeat(item.rating)}
  </li>`;


  }

  function generateBookmarkString(bookmarkItems) {

    const items = bookmarkItems.map((item) => generateItemElement(item));
    return items.join('');

  }

  function render() {

    if (store.error) {
      $('.error').html(`<p class="error">${store.error}<p>`);
    } else {
      $('.error').html('<p class="error"><p>');
    }

    if (!store.hideAdd) {
      $('#js-add').toggleClass('hidden', false);
      $('.hide-add').text('Hide');
    } else {
      $('#js-add').toggleClass('hidden', true);
      $('.hide-add').text('Add a Bookmark');
    }

    let items = store.items.slice();

    if (store.filter) {
      items = items.filter(item => item.rating >= store.filter);
    }
    const bookmarkItemsString = generateBookmarkString(items);
    $('.js-bookmarks').html(bookmarkItemsString);


  }

  function handleHideAdd() {
    $('.hide-add').on('click', function(event) {
      store.setHideAdd();
      console.log(store.hideAdd);
      render();
    });
  }



  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }


  function handleFilter() {

    $('.js-filter').on('change', function (event) {
      console.log(event.target.value);
      store.setFilter(event.target.value);
      console.log(store.filter);
      render();

    });

  }



  function handleFocus() {
    $('.js-bookmarks').on('click keypress', '.js-item-element', function (event) {
      if (event.which === 13 || event.which === 32 || event.type === 'click') {
        console.log(event);
        const id = getItemIdFromElement(event.target);
        console.log(id);
        if (store.focus === id) {
          store.setFocus(null);
        } else {
          store.setFocus(id);
        }
        console.log(store.focus);
        render();

      }
    });
  }


  function handleDelete() {

    $('.js-bookmarks').on('click keypress', '.js-delete', function (event) {
      if (event.which === 13 || event.which === 32 || event.type === 'click') {
        const id = getItemIdFromElement(event.target);
        console.log(id);
        api.deleteItem(id, error => {
          console.log(error.responseJSON.message);
        }, function () {
          store.findAndDelete(id);
          console.log(store.items);

          render();
        });
      }
    });
  }


  function handleAdd() {
    $('#js-add').submit(function (event) {
      event.preventDefault();
      const newItemData = ($(event.target).serializeJson());

      console.log(newItemData);
      api.createItem(newItemData, error => {
        console.log(error.responseJSON.message);
        store.setError(error.responseJSON.message);
        console.log(store.error);
        render();
      }, (data) => {
        console.log(data);
        store.addItem(data);
        console.log(store.items);
        $(this).closest('form').find('input[type=text], input[type=url], textarea').val('');
        $(this).closest('form').find('input[name=rating]').prop('checked', false);
        store.setError(0);
        console.log(store.error);
        render();
      });
    });
  }

  function bindEventListeners() {
    handleFocus();
    handleDelete();
    handleAdd();
    handleFilter();
    handleHideAdd();

  }



  return {
    render,
    bindEventListeners
  };

}());