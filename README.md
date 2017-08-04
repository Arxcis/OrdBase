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
Last updated: 04.08.17 by Jonas Solsvik
### [Data model diagram](https://arxcis.github.io/OrdBase#model-diagram)

The single most important type in Ordbase, is the Translation type.
An instance of the Translation type stores data about:
- A translation
- ...which belongs to a specific client
- ...written in a specific language
- ...is sorted into a specific container 
- ...having a unique key within the given container
- ...is considered complete or not

Here is an example of raw JSON data of type Translation. 

```json
[
  { 
      "clientKey": "fylkesmannen.no", 
      "languageKey": "no-nb", 
      "containerKey": "main_page", 
      "key": "kindergarten", 
      "text": "Barnehage", 
      "isComplete": true
  },

  { 
      "clientKey": "fylkesmannen.no", 
      "languageKey": "en", 
      "containerKey": "main_page", 
      "key": "kindergarten", 
      "text": "Kindergarten", 
      "isComplete": true
  },

  { 
      "clientKey": "fylkesmannen.no", 
      "languageKey": "ger", 
      "containerKey": "main_page", 
      "key": "kindergarten", 
      "text": "nicht fertig heute!", 
      "isComplete": false
  }
]
```
Notice how a translation instance has a composite primary key, consisting of 4 partial keys. 

<br>

**Basic types**

The Ordbase data model has 4 basic entity types, which Entity Framework maps to 4 SQL tables.

[Translation.cs]()
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

[Client.cs]()
```cs
class Client 
{   
    string key 
    string apiKey   
    string webpageUrl?	
    string thumbnailUrl? 
}
```
The clientKey and the apikey will both be unique across clients. @question Will a Client be able to have multiple ApiKeys? Will the translations be shared across ApiKeys?
What will be shared?

[Language.cs]()
```cs
class Language
{
    string key
    string name
}
```
It would be beneficial if all language keys are constained to follow the ISO 639-1 standard, which is used across the web. Ex: en, no, sv. For reference: [https://www.w3schools.com/tags/ref_language_codes.asp](https://www.w3schools.com/tags/ref_language_codes.asp)

[Container.cs]()
```cs
class Container 
{
    string key
}
```
The Container type has only one attribute. This might seem redundant, but it is necessarry to create the many-to-many relationship between a Client and Containers in a SQL-database.

<br>

**Many to many relationship types**

In addition there are 2 many-to-many relationship tables, which Entity framework also maps to SQL tables

[ClientLanguage.cs]()
```cs
class ClientLanguage 
{
    string clientKey
    string languageKey
}
```
[ClientContainer.cs]()
```cs
class ClientContainer
{
    string clientKey
    string containerKey
}
```

In Entity Framework .NET Framework 4.7 these tables are generated automatically, when a many-to-many relationship is detected.
Since we are using the less mature Entity Framework .NET Core 1.1.2, we have to manually declare the many-to-many types, and then link them using the EF Fluent API in the DbContext class OnModelCreating()-method:
```cs
public class TranslationDb : DbContext 
{
    protected override void OnModelCreating(Modelbuilder modelBuilder) 
    {
            modelBuilder
                .Entity<ClientContainer>()
                .HasKey(cc => new 
                {
                    cc.ClientKey,
                    cc.ContainerKey,        
                });

            modelBuilder
                .Entity<ClientContainer>()
                .HasOne(cc => cc.Client)
                .WithMany(c => c.Containers)
                .HasForeignKey(cc => cc.ClientKey);

            modelBuilder
                .Entity<ClientContainer>()
                .HasOne(cc => cc.Container)
                .WithMany(c => c.Clients)
                .HasForeignKey(cc => cc.ContainerKey);
    }
}



```

<br>




**Utility types**

The Utiliity types are special types which are not stored in the database, but generated on-demand by the Ordbase service.

[TranslationGroup.cs]()
```cs
class TranslationGroup 
{
    class Item {
        string LanguageKey 
        string Text 
        bool   IsComplete 
    }

    string Key 
    string ClientKey 
    string ContainerKey 

    IEnumerable<Item> Items
}
```
When editing translations in the editor, one is often interested in comparing one translation between languages.
The TranslationGroup type, combines all instances of Translation which share the same Client, Container and Key, but have 
different languages:

[TranslationGroupMeta.cs]()
```cs
class TranslationGroupMeta 
{
    class Item {
        string LanguageKey 
        bool   IsComplete 
    }

    string Key 
    string ClientKey 
    string ContainerKey 

    IEnumerable<Item> Items
}
```
A variation of the TranslationGroup type exists called the TranslationGroupMeta. It is indentical to TranslationGroup, except for leaving out the Text attribute. This is handy if you ONLY want the meta information about a translation group.


<br>

<div id="system-overview"></div>

## 2. System overview
Last updated: 04.08.17 by Jonas Solsvik

### [System  diagram](https://arxcis.github.io/OrdBase#system-diagram)


<br>
<div id="api-reference"></div>

## 3. API Reference
Last updated: 04.08.17 by Jonas Solsvik


### Base url
```url
https://localhost:5000/api
```



### api/translation

| Method | Path                     | Parameter                                                   | Details                                     |
|--------| -------------------------|-------------------------------------------------------------| ------------------------------------------- |
| GET    | api/translation          | ? clientKey & languageKey & containerKey & translationKey | [link](./DOCS/api/translation/GET-translation.md) |
| GET    | api/translation/keyvalue | ? clientKey & languageKey & containerKey & translationKey | [link](./DOCS/api/translation/GET-translation-keyvalue.md) |
| GET    | api/translation/group    | ? clientKey & languageKey & containerKey                  | [link](./DOCS/api/translation/GET-translation-group.md)  |
| GET    | api/translation/meta     | ? clientKey & languageKey & containerKey                  | [link](./DOCS/api/translation/GET-translation-meta.md)  |
| POST   | api/translation          | json { Translation   }                                      | [link](./DOCS/api/translation/POST-translation.md) |
| POST   | api/translation/array    | json { Translation[] }                                      | [link](./DOCS/api/translation/POST-translation-array.md) |
| PUT    | api/translation          | ? clientKey & languageKey & translationKey & translationKey <br> json { Translation }   | [link](./DOCS/api/translation/PUT-translation.md)|
| PUT    | api/translation/array    | ? clientKey & languageKey & translationKey <br> json { Translation[] }                  | [link](./DOCS/api/translation/PUT-translation-array.md)|
| DELETE | api/translation          | ? clientKey & languageKey & translationKey & translationKey  |   [link](./DOCS/api/translation/DELETE-translation.md) |
| DELETE | api/t  ranslation/group    | ? clientKey & languageKey & translationKey                   | [link](./DOCS/api/translation/DELETE-translation-group.md) |

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
