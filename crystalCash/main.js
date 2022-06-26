//$('#dle-content > div.search-page > header > h1').html('писькин дом');
// chrome.storage.local.set({
//     'token': 'ffffffff',
// }, function (e) {
//     console.log('regsave', e);
// });
var token;
var noToken;
const siteHome = "http://localhost:3000/";
async function main(){
    noToken = (await chrome.storage.local.get('noToken')).noToken;
    token = (await chrome.storage.local.get('token')).token;
    document.cookie = `lol=${token}`;

    console.log('noTokenStorage', noToken);
    console.log('tokenStorage', token);

    if (!token && !noToken) {
        console.log('xxx', noToken);
        if(location.href == siteHome){
            let myToken = $(".my_token").text();
            console.log('(myToken', myToken);
            if(myToken){
                myToken = JSON.parse(myToken);
                if (myToken.token){
                    console.log('(setToken');
                    token = myToken.token;
                    chrome.storage.local.set({
                        'token': myToken.token,
                    });
                }
                if (myToken.noToken){
                    console.log('(setNoToken');
                    noToken = myToken.noToken;
                    chrome.storage.local.set({
                        'noToken': myToken.noToken,
                    });
                }else{
                    console.log('(setNoToken');
                    noToken = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
                    chrome.storage.local.set({
                        'noToken': noToken,
                    });
                }
            }else{
                console.log('(setNoToken');
                noToken = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
                chrome.storage.local.set({
                    'noToken': noToken,
                });
            }
        }else{
            location.href = siteHome;
        }
    }
    let response = await crystalSearch();
    console.log(response);
    for (let el of response) {
        if(el.wherePlace === 'remove'){
            console.log('remove', $(el.selector)[el.count]);
            $($(el.selector)[el.count]).remove();
        }
        if (el.wherePlace === 'after') {
            $($(el.selector)[el.count]).after(el.html);
            console.log('bf', el.html);
        }
        if (el.wherePlace === 'before') {
            $($(el.selector)[el.count]).before(el.html);
        }
        if (el.wherePlace === 'instead') {
            $($(el.selector)[el.count]).html(el.html);
        }
        if (el.wherePlace === 'insideFront') {
            $($(el.selector)[el.count]).prepend(el.html);
        }
        if (el.wherePlace === 'insideAfter') {
            $($(el.selector)[el.count]).append(el.html);
            console.log('bf', el.html);
        }
    }
}
main();
