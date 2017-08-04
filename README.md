# OrdBase ASP.NET Core 1.1.2
I18n solution for FMSF




# linkation
## [1. System  diagram](https://arxcis.github.io/OrdBase#system-diagram)
## [2. Model diagram](https://arxcis.github.io/OrdBase#model-diagram)

## 3. API Reference

### Base url
```url
https://localhost:5000/api
```

<br>

----------------


### api/translation

| Method | Path                     | Parameter                                                   | Details                                     |
|--------| -------------------------|-------------------------------------------------------------| ------------------------------------------- |
| GET    | api/translation          | ? clientKey & languageKey & translationKey & translationKey | [link](docs/api/translation/GET-translation.md) |
| GET    | api/translation/keyvalue | ? clientKey & languageKey & translationKey & translationKey | [link](docs/api/translation/GET-translation-keyvalue.md) |
| GET    | api/translation/group    | ? clientKey & languageKey & translationKey                  | [link](docs/api/translation/GET-translation-group.md)  |
| GET    | api/translation/meta     | ? clientKey & languageKey & translationKey                  | [link](docs/api/translation/GET-translation-meta.md)  |
| POST   | api/translation          | json { Translation   }                                      | [link](docs/api/translation/POST-translation.md) |
| POST   | api/translation/array    | json { Translation[] }                                      | [link](docs/api/translation/POST-translation-array.md) |
| PUT    | api/translation          | ? clientKey & languageKey & translationKey & translationKey <br> json { Translation }   | [link](docs/api/translation/.md)|
| PUT    | api/translation/array    | ? clientKey & languageKey & translationKey <br> json { Translation[] }                  | [link](docs/api/translation/.md)|
| DELETE | api/translation          | ? clientKey & languageKey & translationKey & translationKey  | [link](docs/api/translation/.md) |
| DELETE | api/translation/group    | ? clientKey & languageKey & translationKey                   | [link](docs/api/translation/.md) |

<br>

----------------


### api/client
| Method | Path                     | Parameter                   | Details                        |
|--------| -------------------------|---------------------------- | ------------------------------ |
| GET    | api/client               | ? clientKey                 | [link](docs/api/client/.md)    |
| GET    | api/client/containers    | ? clientKey                 | [link](docs/api/client/.md)    | 
| GET    | api/client/languages     | ? clientKey                 | [link](docs/api/client/.md)    |  
| POST   | api/client               | json { Client   }           | [link](docs/api/client/.md)    |   
| POST   | api/client/containers    | json { string[] }           | [link](docs/api/client/.md)    |    
| POST   | api/client/languages     | json { string[] }           | [link](docs/api/client/.md)    |   
| PUT    | api/client               | ? clientKey                 | [link](docs/api/client/.md)    |  
| DELETE | api/client               | ? clientKey                 | [link](docs/api/client/.md)    | 

<br>

----------------


### api/language
| Method | Path               | Parameter                   | Details                                     |
|--------| ------------------ | --------------------------- | ------------------------------------------- |
| GET    | api/language       | ? languageKey               | [link](docs/api/language/.md)
| POST   | api/language       | json { Language }           | [link](docs/api/language/.md)

<br>

----------------


### api/container

| Method | Path               | Parameter              | Details                         |
|--------| ------------------ | ---------------------- | ------------------------------- |
| GET    | api/container      | ? containerKey         | [link](docs/api/container.md)

<br>

----------------

<br>