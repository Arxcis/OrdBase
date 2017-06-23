using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using OrdBaseCore.Models;

// @doc private interface property - https://stackoverflow.com/questions/7767024/why-c-sharp-compiler-does-not-allows-private-property-setters-in-interfaces

namespace OrdBaseCore.IData
{
    public interface ITranslationData
    {
    	Translation[] Get           (string client, string language, string container, string accessKey);
    	Translation[] GetOnClient   (string client);
    	IQueryable<object> GetOnContainer(string client, string container);
    	Dictionary<string,string> GetOnContainer(string client, string languaage, string container);
    	Translation[] GetOnAccessKey(string client, string accesskey);
    	Translation[] GetOnLanguage (string client, string language);
		IActionResult Create(Translation Translation);
		IActionResult Update(Translation Translation);
    }	
}
