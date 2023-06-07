import Pagination from "tui-pagination";
import "tui-pagination/dist/tui-pagination.css";
import { countPage } from "../search-string-block/search-string-block";
import { onLoadTrends } from "../search-string-block/search-string-block";
import { callFetchFilmByValue } from "../search-string-block/search-string-block";

export function createPagination(totalPage, currentPage, key){
    const pagination = new Pagination("pagination-block-div", {
        totalItems: totalPage,
        itemsPerPage: 20,
        visiblePages: 3,
        page: currentPage,
        template: { 
          usageStatistics: false,
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
        doCall(page, key)
      });
}





async function doCall(page, key){
await countPage(page)
window.scrollTo(0, 450)
if(key === "fetchTrends"){
    onLoadTrends()
}else if(key === "fetchFilmByValue"){
    callFetchFilmByValue()
}


}