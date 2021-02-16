<h1 class="code-line" data-line-start=0 data-line-end=1><a id="Blog_0"></a>Blog</h1>
<p class="has-line-data" data-line-start="2" data-line-end="3">Prova di creazione blog, l’idea è che abbia diverse
     sezioni:</p>
<ul>
     <li class="has-line-data" data-line-start="4" data-line-end="5">Gestione database eventi di canoa slalom</li>
     <li class="has-line-data" data-line-start="5" data-line-end="7">Gestione di un blog con vari articoli</li>
</ul>
<h1 class="code-line" data-line-start=7 data-line-end=8><a id="Come_funziona_7"></a>Come funziona?</h1>
<p class="has-line-data" data-line-start="9" data-line-end="10">Il blog, è realizzato con pattern MVC.</p>
<p class="has-line-data" data-line-start="11" data-line-end="14">Lato server, è gestito alla base da Node.js e come base
     di dati MongoDB.<br>
     L’autenticazione è gestita tramite <a href="https://jwt.io/introduction">JWT</a> e cookies.<br>
     Il templating avviene grazie ad <a href="https://ejs.co/">EJS</a> e gestito lato client da HTML/CSS/JavaScript ed
     il framework <a href="https://bulma.io/">Bulma</a>.</p>
<h3 class="code-line" data-line-start=15 data-line-end=16><a id="Autenticazione_15"></a>Autenticazione</h3>
<p class="has-line-data" data-line-start="16" data-line-end="18">L’autenticazione degli utenti avviene attraverso i dati nel database e i JWT. Serve per poter aggiungere ed eliminare articoli o aggiungere competizioni.<br>
     Dato che gli utenti che potranno accedere alle funzionalità accesssibili con l’autenticazione saranno molto pochi,
     e ben conosciuti, non c’è ancora una suddivisione a livelli di “poteri” e la registrazione è possibile solo una
     volta loggati.</p>
<h3 class="code-line" data-line-start=19 data-line-end=20><a id="Competizioni_di_canoa_slalom_19"></a>Competizioni di
     canoa slalom</h3>
<p class="has-line-data" data-line-start="21" data-line-end="23">Ho voluto inserire la gestione di un database
     contenente i dati delle più importanti competizioni di canoa slalom.<br>
     Dato che online non si trovano tutti i dati da un unica fonte, voglio raggrupparle tutte in un unico database.</p>
<h3 class="code-line" data-line-start=24 data-line-end=25><a id="Articoli_24"></a>Articoli</h3>
<p class="has-line-data" data-line-start="26" data-line-end="29">Gli articoli sono inseribili ed eliminabili solo da
     coloro autenticati.<br>
     Le pagine vengono renderizzate dinamicamente dai dati nel database e le immagini nel server.<br>
     La scrittura dei body degli articoli viene facilitata grazie all’editor <a
          href="https://www.tiny.cloud/">TinyMCE</a>.</p>