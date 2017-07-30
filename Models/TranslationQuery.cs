 
namespace OrdBaseCore.Models 
{
    public class TranslationQuery
    {  
        public string ClientKey      { get; set; }
        public string LanguageKey    { get; set; }
        public string ContainerKey   { get; set; } 
        public string TranslationKey { get; set; }
    }

    public class TranslationGroupQuery
    {  
        public string ClientKey      { get; set; }
        public string ContainerKey   { get; set; } 
        public string TranslationKey { get; set; }
    }
}