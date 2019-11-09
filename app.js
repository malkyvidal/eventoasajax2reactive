const { fromEvent, race } = require('rxjs');
const {  map, switchMap } = require('rxjs/operators');
const { ajax } = require('rxjs/ajax');


let getFlag = (data) => data[0].flag;
let btn = document.getElementById('btn');
let res = document.getElementById('res');
let getFlag = (url)=>ajax.getJSON(url)
.pipe(
    
    map(getFlag)
);

banderaUno$ = getFlag("https://restcountries.eu/rest/v2/name/albania?fullText=true")
    
banderaDos$ = getFlag("https://restcountries.eu/rest/v2/name/argentina?fullText=true")
    

primero$ = race(banderaUno$, banderaDos$)


fromEvent(btn,'click')
        .pipe(
            
            switchMap(
                evt => primero$
            )
        ).subscribe(ban=>{res.src=ban;res.hidden=false});