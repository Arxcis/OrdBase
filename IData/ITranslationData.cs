using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using OrdBaseCore.Models;

// @doc private interface property - https://stackoverflow.com/questions/7767024/why-c-sharp-compiler-does-not-allows-private-property-setters-in-interfaces

namespace OrdBaseCore.IData
{
    public interface ITranslationData
    {
    	IEnumerable<Translation> Get           (string client, string language, string container, string accessKey);
    	IEnumerable<Translation> GetOnClient   (string client);
    	IEnumerable<object> GetOnContainer(string client, string container);
    	IEnumerable<KeyValuePair<string,string>> GetOnContainer(string client, string languaage, string container);
    	IEnumerable<Translation> GetOnAccessKey(string client, string accesskey);
    	IEnumerable<Translation> GetOnLanguage (string client, string language);
		IActionResult Create(Translation Translation);
		IActionResult Update(Translation Translation);
		
		// ID == (string client, string language, string container, string accesskey) 
		IActionResult Delete(string client, string language, string container, string accesskey);
    }	
}
