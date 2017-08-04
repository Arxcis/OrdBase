# OrdBase ASP.NET Core 1.1.2
I18n solution for FMSF


<br>

# Documentation

**Table of contents** <br>
[1. Data model](#data-model) <br>
[2. System overview](#system-overview) <br>
[3. API Reference](#api-reference) <br>

<div id="data-model"></div>

## 1. Data model
### [Model diagram](https://arxcis.github.io/OrdBase#model-diagram)



Here is an example of raw data of type Translation. 

```json
[
  { 
      clientKey: "fylkesmannen.no", 
      languageKey: "no-nb", 
      containerKey: "main_page", 
      key: "kindergarten", 
      text: "Barnehage", 
      isComplete: true
  },

  { 
      clientKey: "fylkesmannen.no", 
      languageKey: "en", 
      containerKey: "main_page", 
      key: "kindergarten", 
      text: "Kindergarten", 
      isComplete: true
  },

  { 
      clientKey: "fylkesmannen.no", 
      languageKey: "ger", 
      containerKey: "main_page", 
      key: "kindergarten", 
      text: "nicht fertig!", 
      isComplete: false
  }
]
```

Notice how a translation instance has a composite primary key, consisting of 4 partial keys. 

The data model has 4 entities, which Entity Framework maps to 4 SQL tables.

**Translation.cs**
```cs
class Translation 
{
    string clientKey 
    string languageKey
    string containerKey
    string key 
    string text
    bool   isComplete
}

```

**Client.cs**
```cs
class Client 
{   
    string key 
    string apiKey 
    string webpageUrl	
    string thumbnailUrl 
}
```

**Language.cs**
```cs
class Language
{
    string key
    string name
}
```

**Container.cs**
```cs
class Container 
{
    string key
}
```

In addition there are 2 many-to-many relationship tables
ClientLanguage.cs
```cs
class ClientLanguage 
{
    string clientKey
    string languageKey
}
```
ClientContainer.cs
```cs
class ClientContainer
{
    string clientKey
    string containerKey
}
```

### Client.cs 
**Draft**
```cs


```

**Example keys**

### Langauge.cs 
**Draft**
```cs


```

**Example keys**

### Container.cs 
**Draft**
```cs


```

**Example keys**


<br>

<div id="system-overview"></div>

## 2. System overview
### [System  diagram](https://arxcis.github.io/OrdBase#system-diagram)


<br>
<div id="api-reference"></div>

## 3. API Reference

### Base url
```url
https://localhost:5000/api
```



### api/translation

| Method | Path                     | Parameter                                                   | Details                                     |
|--------| -------------------------|-------------------------------------------------------------| ------------------------------------------- |
| GET    | api/translation          | ? clientKey & languageKey & containerKey & translationKey | [link](docs/api/translation/GET-translation.md) |
| GET    | api/translation/keyvalue | ? clientKey & languageKey & containerKey & translationKey | [link](docs/api/translation/GET-translation-keyvalue.md) |
| GET    | api/translation/group    | ? clientKey & languageKey & containerKey                  | [link](docs/api/translation/GET-translation-group.md)  |
| GET    | api/translation/meta     | ? clientKey & languageKey & containerKey                  | [link](docs/api/translation/GET-translation-meta.md)  |
| POST   | api/translation          | json { Translation   }                                      | [link](docs/api/translation/POST-translation.md) |
| POST   | api/translation/array    | json { Translation[] }                                      | [link](docs/api/translation/POST-translation-array.md) |
| PUT    | api/translation          | ? clientKey & languageKey & translationKey & translationKey <br> json { Translation }   | [link](docs/api/translation/.md)|
| PUT    | api/translation/array    | ? clientKey & languageKey & translationKey <br> json { Translation[] }                  | [link](docs/api/translation/.md)|
| DELETE | api/translation          | ? clientKey & languageKey & translationKey & translationKey  | [link](docs/api/translation/.md) |
| DELETE | api/t  ranslation/group    | ? clientKey & languageKey & translationKey                   | [link](docs/api/translation/.md) |

<br>



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



### api/language
| Method | Path               | Parameter                   | Details                                     |
|--------| ------------------ | --------------------------- | ------------------------------------------- |
| GET    | api/language       | ? languageKey               | [link](docs/api/language/.md)
| POST   | api/language       | json { Language }           | [link](docs/api/language/.md)

<br>



### api/container

| Method | Path               | Parameter              | Details                         |
|--------| ------------------ | ---------------------- | ------------------------------- |
| GET    | api/container      | ? containerKey         | [link](docs/api/container.md)

<br>
