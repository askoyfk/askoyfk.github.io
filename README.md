Askøy Fotballklubb websider oversikt
====================================


Askøy Fotballklubb bruker Github, som er et sosialt kodenettverk. Dette åpner for at alle som vil kan bidra ved å opprette en github-konto. En github-konto er i utgangspunktet gratis.

Vi trenger folk som kan skrive, fotografere, designe, teste og komme med innspill og forslag.

For å rapportere en feil eller kommentere noe, kan man opprette en [issue](https://github.com/askoyfk/askoyfk-weboversikt/issues), eller kommentere i en allerede eksisterende issue.


## Oppbygging


### Plakater

Øverst på forsiden har vi plakater. En plakat brukes for å promotere noe. Eksempler på plakater kan være Nobi Julecup (påmelding, kjøreanvisning, kampoppsett), Tine fotballskole, "Vil du bli dommer?" etc.

Dersom flere plakater er aktive om gangen vil de vises i en karusell.


## Teknisk

Websidene er bygget med Jekyll, som er en statisk html-generator. Det vil si at det kun er tekstfiler og bildefiler involvert, og ingen database. Jekyll er valgt fordi det er relativt enkelt å bygge opp sidene, og de kan hostes gratis hos Github. Når de hostes hos github bygges de automatisk når man gjør endringer. Andre statiske html-generatorer krever at man bygger lokalt på egen mac/pc.

Innholdet på sidene er hentet fra fotballdata.no, Google spreadsheets, og fra markdown-filer.

På sikt vil vi også hente innhold fra flere sosiale nettverk som Facebook, Instagram, Twitter etc.

### Fotballdata

Kampoppsett, tabeller etc. fra fiks-databasen er tilgjengelig via fotballdata.no. Her abonnerer vi på rådata, og lager våre egne widgets. Disse ligger i et eget repo som heter [football-elements](https://github.com/askoyfk/football-elements).

Eksempel på football-element er [kampoppsett for a-laget](http://batfink.github.io/football-elements/).


### Google Spreadsheets

Informasjon om lag, trenere og fiks-id for å hente data fra fiks ligger i regnearket ["AFK lag 2014"](https://docs.google.com/spreadsheets/d/1svnSp174idz6UiibQbdYqOO6wGH1tbPAxANK6TVZKHc/edit?usp=sharing). Dette regnearket er offentlig tilgjengelig for alle, men det er kun enkelte som har redigeringsrettigheter. Ta kontakt med Torill dersom du ønsker å kunne redigere innholdet.

Kampoppsett på Mohn-banen ligger ikke i fiks-databasen, og må derfor redigeres i regnearket ["AFK kampoppsett barnefotball"](https://docs.google.com/spreadsheets/d/1hCZxu3AINe6j1orpLSxeh9Q5LhhsML3GDSVk-zaYEuY/edit?usp=sharing). Denne filen er også offentlig tilgjengelig for alle, men redigeres av …


### Markdown-filer

Alle dokumenter som ligger på github og som er skrevet med Markdown kan inkluderes på websidene. Hvis vi tar [Sportsplanen](https://github.com/askoyfk/sportsplan) som et eksempel, vil den dersom den overføres til Github og konverteres til markdown bli bedre egnet til å leses på skjerm på enheter av alle størrelser. Det vil også være enklere for flere å samarbeide om innholdet, og å se revisjonshistorikk.

Jekyll bruker også Markdown til tekstformattering.



## Gjenstår

### Arrangementssider
- [ ] Tine Fotballskole
- [ ] Nobi Julecup
- [ ] Minidagen

### Football-elements
- [ ] Hva ønsker vi å vise?
- [ ] Bygge ferdig komponenter
