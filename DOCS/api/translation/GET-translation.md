# GET - api/translation


## API request example 

**GET request url**
```url
http://localhost:5000/api/translation/?clientKey=Ordbase&languageKey=en&containerKey=error_messages
``` 

**JSON Response**
```json
[
    {
        "clientKey": "Ordbase",
        "languageKey": "en",
        "containerKey": "error_messages",
        "key": "error_create_client",
        "text": "Failed to create client. Client may already exist",
        "isComplete": false
    },
    {
        "clientKey": "Ordbase",
        "languageKey": "no-nb",
        "containerKey": "error_messages",
        "key": "error_create_client",
        "text": "Fikk ikke til å lage ny klient. Klienten finnes kanskje fra før?",
        "isComplete": true
    }
]
```
<br>

**URI parameters** <br>
```
clientKey             type: string     length: <= 127     optional
languageKey           type: string     length: <= 8       optional
containerKey          type: string     length: <= 64      optional
translationKey        type: string     length: <= 127     optional 
``` 

**Response type**
```cs
    Translation[]
```

<br>

## API Implementation example

[**Route.js**](/wwwroot/lib/Route.js)
```javascript
export function translation_get({ clientKey      = '',  
                                  languageKey    = '',  
                                  containerKey   = '',  
                                  translationKey = '', } = {}) { 

    const queryString = `clientKey=${clientKey}
                         &languageKey=${languageKey}
                         &containerKey=${containerKey}
                         &translationKey=${translationKey}`;
    
    return Fetch.GET({  
        route: `api/translation/?${queryString}`,
    }); 
}
```

[**TranslationController.cs**](/Controllers/TranslationController.cs)
```cs
[HttpGet("api/translation")]
public IEnumerable<Translation> Get([FromQuery] TranslationQuery query)
{   
    return _translationRepo.Get(query); 
}
```

[**TranslationRepository.cs**](/Repositories/TranslationRepository.cs)
```cs
public IEnumerable<Translation> Get(TranslationQuery query)
{
    return (from t in _context.Translation
            where  t.ClientKey    == query.ClientKey      || query.ClientKey      == null           
            where  t.LanguageKey  == query.LanguageKey    || query.LanguageKey    == null       
            where  t.ContainerKey == query.ContainerKey   || query.ContainerKey   == null     
            where  t.Key          == query.TranslationKey || query.TranslationKey == null 
            select t).ToArray();        
}
```
