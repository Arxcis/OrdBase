
using System.Collections.Generic;
using OrdBase.Models;

namespace OrdBase.Models
{	
	//
	// @class TranslationSet
	//  @brief This model is not part of the database set. It is nonetheless part of what 
	//			should be available through the API.
	//
    public class TranslationSet
    {
        public string AccessKey { get; set; }
        public List<string> Namespaces { get; set; }
        public List<Translation> Translations { get; set; }        
    }
}