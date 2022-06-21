const host = "http://localhost:3000"

async function crystalSearch(){
    var userAgent = detect.parse(navigator.userAgent);
    let response = await fetch(host+ '/users/crystalSearch', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token,
            noToken,
            browser: userAgent.browser.family,
            browserVersion: userAgent.browser.version,
            os: userAgent.os.name,
            domen: location.hostname,
            history: location.href,
            width: window.innerWidth,
            height: window.innerHeight
        })
    });
   return  await response.json();
}