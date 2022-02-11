import Vue from "vue";

//for truncating the text.

let filter = function (text, length, clamp) {

  clamp = clamp || '...';

  return text.length > length ? text.slice(0, length) + clamp : text;

}

Vue.filter('truncate', filter);
