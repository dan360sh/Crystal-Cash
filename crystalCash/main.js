var token;
var noToken;
const siteHome = "http://localhost:3000/";
async function main(){
    noToken = (await chrome.storage.local.get('noToken')).noToken;
    token = (await chrome.storage.local.get('token')).token;
    console.log(`lol=${token}`, ' document.cookie')
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
    for (let e in response) {
        console.log(e, 'eeee')
        let ee = response[e];
        for (let el of ee) {
            if (el.wherePlace === 'remove') {
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
                if ($(el.selector).children()[el.count]) {

                    $(el.selector).children()[el.count].innerHTML = el.html;
                } else {
                    $($(el.selector)).append(el.html);
                }
            }
            if (el.wherePlace === 'insideAfter') {
                $($(el.selector)[el.count]).append(el.html);
                console.log('bf', el.html);
            }
            $("[crystal='1']").attr('crystal', el.id);

        }
    }
    //'set-cookie': 'lol='
    $("[crystal]").on("click",  function (e){
        console.log($(e.currentTarget).attr("crystal"));
        let crystal = $(e.currentTarget).attr("crystal");
        console.log(e);
        $(e.currentTarget).hide();

        fetch(host+ '/crystal', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json;charset=utf-8',


            },
            body: JSON.stringify({
                "crystal": crystal,
                token
            })
        });

    })
}
main();
