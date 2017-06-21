using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using OrdBase.Models;
using OrdBase.Services;

namespace OrdBase.Controllers
{	
	[RoutePrefix("api/{client}/container")]
    public class ContainerController : ApiController
    {
    	[Route("")]
    	public string[] GetOnClient(string client) 
    	{
    		using(var containerRepo = new ContainerRepository()) 
    		{ return containerRepo.GetOnClient(client); }
    	}

    	[Route("{accesskey}")]
    	public string[] Get(string client, string accesskey) 
    	{
    		using(var containerRepo = new ContainerRepository()) 
    		{ return containerRepo.Get(client, accesskey); }
    	} 
    }
}
