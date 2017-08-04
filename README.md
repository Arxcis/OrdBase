# OrdBase ASP.NET Core 1.1.2
I18n solution for FMSF


<br>

## [Documentation](https://arxcis.github.io/OrdBase/)

<br>

## [RestAPI Reference](DOCS/api/index.md)

<br>



            <pre>

 ____________________________________                               
| Components                         |
|------------------------------------|
| <a class="link01">card-client.html</a>              |
| <a class="link01">card-client.js</a>                 |
|------------------------------------|
| <a class="link01">card-translation.html</a>       |
| <a class="link01">card-translation.js</a>          |
|------------------------------------|
| <a class="link01">flipper-language.html</a>       |
| <a class="link01">flipper-language.js</a>          |
|------------------------------------|
| <a class="link01">form-client.html</a>              |
| <a class="link01">form-client.js</a>                 |
|------------------------------------|
| <a class="link01">generator-container.html</a>   |                ___________________________________
| <a class="link01">generator-container.js</a>      |               | ViewComponents                   |
|------------------------------------|               |----------------------------------|
| <a class="link01">generator-translation.html</a> |               | <a class="link02">edit-client.html</a>            |
| <a class="link01">generator-translation.js</a>    |              | <a class="link02">edit-client.js</a>               |
|------------------------------------|               |----------------------------------|
| <a class="link01">header.html</a>                    |               | <a class="link02">select-client.html</a>          |             __________________________________ 
| <a class="link01">header.js</a>                       |               | <a class="link02">select-client.js</a>            |             | Network                          |
|------------------------------------|               |----------------------------------|             |----------------------------------|
| <a class="link01">picker-container.html</a>       |               | <a class="link02">select-translation.html</a>   |             | <a class="link03">Route.js</a>                       |
| <a class="link01">picker-container.js</a>          |               | <a class="link02">select-translation.js</a>     |              | <a class="link03">Fetch.js</a>                      |
|____________________________________|               |__________________________________|             |__________________________________|  
                  |                                                |                                                   |
                  |                                                |                                                   |
                  |                                                |                                                   |
                  |                                                |                                                   |             
                  |                                                |                                                   |          
                  |                                 _______________|__________________                                 |      
                  |                                | App                              |                                | 
                  |________________________________|----------------------------------|________________________________|
                                                   | <a class="link04">App.js</a>                         |
                                                   | <a class="link04">loadSelectClient.js</a>        |
                                                   | <a class="link04">loadNewClient.js</a>            |
                                                   | <a class="link04">loadEditClient.js</a>           |
                                                   | <a class="link04">loadSelectTranslation.js</a>  |
                                                   |__________________________________|    
                                                                   |             
                                                                   |
                                                                    ---------------  <b>webpack babel es2016</b>
                                                                   |
                                                    _______________|_________________                               
                                                   |  Webpacked app                   |
                                                   |----------------------------------|                             
                                                   | <a class="link05">Bundle.js</a>                     |
                                                   | <a class="link05">index.html</a>                    |
                                                   | <a class="link05">index.css</a>                     |
                                                   |__________________________________|  
                                                                   |
                                                                   |
                                                                    ----- <b>Chrome 61 native (Chrome 60 with flags)</b>
                                                                   |
  <i>Web client</i>                                                       |
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Intranet
  <i>Web server</i>            |
                        |
                         ------------ <b>http://ordbase.fylkesmannen.local</b>
                        |
         _______________|_________________                               
        | IIS Proxy server                 |  
        |----------------------------------|
        | <a class="link06">web.config</a>                    |
        |__________________________________|    
                        |
                        |
                         --------------<b> dotnet run</b> and <b>http://localhost:5000</b>
                        |               
         _______________|__________________                               
        | .net core Kestrel server         |  
        |----------------------------------|
        | <a class="link06">Program.cs</a>                    |
        | <a class="link06">OrdBaseCore.csproj</a>                    |
        |__________________________________|    
                        |
         _______________|__________________                               
        | ASP MVC middleware               |  
        |----------------------------------|
        | <a class="link06">Startup.cs</a>                    |
        |__________________________________|                       __________________________________
                        |                                         | Models                           |
         _______________|__________________                       |----------------------------------|      
        | ASP MVC Controllers              |                      | <a class="link09">TranslationDb.cs</a>            |           
        |----------------------------------|                      | <a class="link09">Translation.cs</a>               |      
        | <a class="link07">TranslationController.cs</a> |                      | <a class="link09">TranslationGroup.cs</a>         |                           
        | <a class="link07">ClientController.cs</a>        |                      | <a class="link09">Client.cs</a>                     |                             
        | <a class="link07">ContainerController.cs</a>    |______________________| <a class="link09">Container.cs</a>                 |  
        | <a class="link07">LanguageController.cs</a>     |                      | <a class="link09">Container.cs</a>                 |      
        |__________________________________|                      |__________________________________|      
                        |                                                |        |                
         _______________|__________________                              |        | 
        | Repositories                     |_____________________________|         ------- <b>dotnet ef migrations add</b>
        |----------------------------------|                                      |
        | <a class="link08">TranslationRepository.cs</a> |                       ________________|________________________                         
        | <a class="link08">ClientRepository.cs</a>        |                      | Migrations                             |                              
        | <a class="link08">ContainerRepository.cs</a>    |                      |----------------------------------------|
        | <a class="link08">LanguageRepository.cs</a>     |                      | <a class="link10">TranslationDbModelSnapshot.cs</a> |               
        |__________________________________|                      |________________________________________|        
                        |                                                         |
                        |                                                         |
                         ------ <b>DBContext</b>                                          -------- <b>dotnet ef database update</b>
                        |                                                         |
  <i>Web server</i>            |                                                         |
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - SQL
  <i>Sql database</i>                                      |
                                                    |
                                                     ------- <b>http://ordbase.fylkesmannen.sql</b> and <b><a class="link06">config.js</a></b>
                                                    |
                                     ______________ |__________________                               
                                    |                                  |  
                                    | Microsoft SQL Express            |  
                                    |__________________________________|    



            </pre>
