using System.Collections.Generic;

namespace OrdBaseCore.Models 
{
    //
    // @note This is a datastructure which only exists in memory, and are never stored. It is constructed
    //       from grouping together translations which share the same key, different languages, and then 
    //       pulling out the meta information.
    //
    // @note2 There also exists a TranslationGroup datastructure, which is just an array of translations
    //         which share the same key. I have not found it necesarry yet to create a datastructure to 
    //         represent a TranslationGroup, but I might do it in the future.
    //
    public class TranslationGroupMeta 
    {
        public string Key { get; set; }
    
        public string ClientKey   { get; set; }
        public string ContainerKey { get; set; }
        public IEnumerable<KeyValuePair<string, bool>> IsComplete { get; set; }
    }
}