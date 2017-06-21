using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http; 
using System.Web.Http;

using OrdBase.Models;
using OrdBase.Services;
using OrdBase.IData;

namespace OrdBase.Controllers
{	
	[RoutePrefix("api/{client}/container")]
    public class ContainerController : ApiController, IContainerData
    {
        private readonly IContainerData _containerRepo;

        public ContainerController(IContainerData containerRepo)
        {
            _containerRepo = containerRepo;
        }

    	[Route("")]
    	public string[] GetOnClient(string client) 
    	{
    		return _containerRepo.GetOnClient(client); 
    	}

    	[Route("{accesskey}")]
    	public string[] Get(string client, string accesskey) 
    	{
    		return _containerRepo.Get(client, accesskey); 
    	} 
    }
}
