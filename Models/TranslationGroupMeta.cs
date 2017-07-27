using System.Collections.Generic;

namespace OrdBaseCore.Models 
{
    public class TranslationGroupMeta 
    {
        public string Key { get; set; }
        public IEnumerable<KeyValuePair<string, bool>> IsComplete { get; set; }
    }
}