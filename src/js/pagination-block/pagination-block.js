import Pagination from "tui-pagination";
import "tui-pagination/dist/tui-pagination.css";

const pagination = new Pagination("pagination-block-div", {
  totalItems: 100,
  itemsPerPage: 10,
  visiblePages: 3,
  page: 1,

  template: {
    page: '<a href="#" class="tui-page-btn important-page">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected important-page">{{page}}</strong>',
    moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
            '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
    disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
            '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
    moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
            '<span class="tui-ico-ellip">...</span>' +
        '</a>'
}
});

pagination.on("afterMove", (event) => {
  const { page } = event;
  /* тут викликаємо запит */
  // fetch(`https://some-site.com/products?page=${page}`)
  console.log(page);
});
