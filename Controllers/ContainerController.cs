using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

using OrdBaseCore.Models;
using OrdBaseCore.IData;

namespace OrdBaseCore.Controllers
{	
    public class ContainerController : Controller
    {
        private readonly IContainerData _containerRepo;

        public ContainerController(IContainerData containerRepo)
        {
            _containerRepo = containerRepo;
        }

    	[Route("api/{client}/container")]
    	[Route("api/{client}/container/all")]		
    	public string[] GetAll(string client) 
    	{
    		return _containerRepo.GetAll(client); 
    	}

    	[Route("api/{client}/container/{accesskey}")]
    	public string[] Get(string client, string accesskey) 
    	{
    		return _containerRepo.Get(client, accesskey); 
    	} 
    }
}
