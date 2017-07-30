using System.Collections.Generic;

namespace OrdBaseCore.Models 
{
    //
    // @note These is datastructures which only exists in memory, and are never stored in DB. 
    //
    public class TranslationKeyValue 
    {
        public KeyValuePair<string,string> KeyValue { get; set; }
    }

    public class TranslationGroup 
    {

        public struct GroupItems 
        {
            string Language { get; set; }
            string Text { get; set; }
            string IsComplete { get; set; }
        }

        public string ClientKey { get; set; }
        public string ContainerKey { get; set; }
        public string GroupKey { get; set; }

        public IEnumerable<GroupItems> Items{ get; set; }
    }
    
    public class TranslationGroupMeta 
    {
        public struct GroupMetaItems 
        {
            string Language { get; set; }
            bool   IsComplete { get; set; }
        }

        public string Key { get; set; }
        public string ClientKey   { get; set; }
        public string ContainerKey { get; set; }
        public IEnumerable<GroupMetaItems> Items { get; set; }
    }
}