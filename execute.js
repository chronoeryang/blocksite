const filter = {
    urls: [
      "*://*.securedwebsearch.com/*",
      "*://*.search.yahoo.com/*"
    ],
}

const webRequestFlags = [
    "blocking"
];

window.chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      let q = getQ(details.url);
      window.chrome.tabs.update({url: "https://www.google.com/search?"+q});

      return {cancel: true};
    },
    filter,
    webRequestFlags,
);

function getQ(url){
    let parseURL = new URL(url);
    let params = parseURL.searchParams;

    for (let pair of params.entries()) {
        if(pair[0] == "q"){
            return pair[0] + "=" + pair[1];
        }
    }
}
