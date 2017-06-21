using System.Collections.Generic;
using System.Web.Http;

using OrdBase.Services;
using OrdBase.Models;

namespace OrdBase.Controllers
{
	[RoutePrefix("api/translation")]
    public class TranslationController : ApiController
    {
    	[Route("{client}/{language}/{accessKey}")]
    	public Translation Get(string client, string language, string accessKey)
    	{
    		using (var repo = new TranslationRepository()) 
    		{
    			return new Translation {};
    		}
    	}

    	[Route("{client}/{language}")]
    	public IEnumerable<Translation> Get(string client, string language)
    	{
    		using (var repo = new TranslationRepository()) 
    		{
    			return new Translation [] {};
    		}
    	}
    }
}
