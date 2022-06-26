
export interface searchParse{
    _id: string;
    search: string;
}
export interface urlParams{
    query?: any,
    hash?: string,
    protocol: string,
    domen: string,
    path?: string,
}
export function parseQuery(url: string): urlParams{
    let hash = url.split('#');
    let get: string[] = hash[0].split('?');
    let mass = {};
    let urlParse = get[0].split('/');
    if(get[1]){
        let getParse =  decodeURI(get[1]).split('&');
        for (let i of getParse){
            let j = i.split("=");
            mass[j[0]] = j[1];
        }
    }
    let protocol = urlParse.shift();
    urlParse.shift();
    let damen = urlParse.shift();

    return {
        query: mass,
        hash: hash[1],
        protocol: protocol,
        domen: damen,
        path: urlParse.join('/')
    };
}
export function searchСompare(mySearch: string[], serch: string[]): boolean{
    if(mySearch.some(e => e === "*")){
        if(serch.some(e => e === mySearch[0])){
            return true;
        }
    }else{
        for(let my of mySearch){
            if(!serch.some(e => e === my)){
                return false;
            }
        }
        return true;
    }
    return false;
}
export interface advertisementParse{
    selector: string;

    maxCount: number;

    minCount: number;

    priority: number;

    html: string;

    wherePlace: string;
}

export function responsePreparation(advertisement: advertisementParse[]): any{
    advertisement.sort(function (a , b){
        return b.priority - a.priority;
    });
    let mass = {};
    let answer = [];
    for(let el of advertisement){
        if(mass[el.selector]){
            for(let i = el.minCount; el.maxCount >= i; i++){
                if(!mass[el.selector].include(i)){
                    answer.push({
                        selector: el.selector,
                        html: el.html,
                        wherePlace: el.wherePlace,
                        count: i
                    });
                    mass[el.selector].push(i);
                }
            }
        }else{
            answer.push({
                selector: el.selector,
                html: el.html,
                wherePlace: el.wherePlace,
                count: el.minCount
            });
            mass[el.selector] = [el.minCount];
        }
    }
    return answer;

}