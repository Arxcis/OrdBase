using Microsoft.AspNetCore.Mvc;

// @doc [FromQery] attributes https://stackoverflow.com/questions/42929376/bind-query-parameters-to-a-model-in-asp-net-core
namespace OrdBaseCore.Models 
{
    public class TranslationQuery
    {  
        [FromQuery(Name="clientKey")]
        public string ClientKey      { get; set; }

        [FromQuery(Name="languageKey")]
        public string LanguageKey    { get; set; }

        [FromQuery(Name="containerKey")]
        public string ContainerKey   { get; set; } 
        
        [FromQuery(Name="translationKey")]
        public string TranslationKey { get; set; }
    }

    public class TranslationGroupQuery
    {  
        [FromQuery(Name="clientKey")]
        public string ClientKey      { get; set; }

        [FromQuery(Name="containerKey")]
        public string ContainerKey   { get; set; } 
        
        [FromQuery(Name="translationKey")]
        public string TranslationKey { get; set; }
    }
}