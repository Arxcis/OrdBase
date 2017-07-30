using System.Collections.Generic;

namespace OrdBaseCore.Models 
{
    //
    // @note These is datastructures which only exists in memory, and are never stored in DB. 
    //
    public class TranslationGroup 
    {
        public string Key { get; set; }
        public string ClientKey { get; set; }
        public string ContainerKey { get; set; }

        public IEnumerable<Translation> Items{ get; set; }
    }

    public class TranslationGroupMeta 
    {
        public struct Item 
        {
            public string LanguageKey { get; set; }
            public bool   IsComplete { get; set; }
        }
        public string Key { get; set; }
        public string ClientKey   { get; set; }
        public string ContainerKey { get; set; }
        public IEnumerable<Item> Items { get; set; }
    }
}