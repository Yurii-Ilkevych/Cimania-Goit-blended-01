export const KEY = "5ab8a567e8520b2d9616d2b554f50b83";

export const KEY_SESSION_STORAGE_SEARCH = "search-storage";
export const KEY_SESSION_STORAGE_HERO = "hero-storage";
export const KEY_SESSION_STORAGE_WEEKLY_TRENDS = "weekly_trends";
export const KEY_SESSION_STORAGE_UPCOMING_THIS_MONTCH = "upcoming_this_month";

resetAllSessionStorage()
function resetAllSessionStorage(){
    sessionStorage.removeItem(KEY_SESSION_STORAGE_SEARCH);
    sessionStorage.removeItem(KEY_SESSION_STORAGE_HERO);
    sessionStorage.removeItem(KEY_SESSION_STORAGE_WEEKLY_TRENDS);
    sessionStorage.removeItem(KEY_SESSION_STORAGE_UPCOMING_THIS_MONTCH);
}