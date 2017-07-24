using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

using OrdBaseCore.Models;
using OrdBaseCore.IData;

namespace OrdBaseCore.Controllers
{
    public class ClientController : Controller
    {
        private readonly IClientData _clientRepo;

        public ClientController(IClientData clientRepo)
        {
            _clientRepo = clientRepo;
        }

        //
        // GET
        //
        [HttpGet("api/")]
    	[HttpGet("api/client")]
    	public IEnumerable<Client> GetAll()
    	{
    		return _clientRepo.GetAll();
    	}

    	[HttpGet("api/{client}")]
    	public IEnumerable<Client> Get(string client) 
    	{
            return _clientRepo.Get(client);
    	}


        //
        // CREATE, UPDATE, DELETE  @doc https://docs.microsoft.com/en-us/aspnet/core/tutorials/web-api-vsc#implement-the-other-crud-operations|
        //
        [HttpPost("api/client/create")]
        public IActionResult Create([FromBody] Client client) 
        {   
            // @note validates if JSON body has the correct type
            if (client == null)
                return  BadRequest();

            _clientRepo.Create(client);
            return StatusCode(201);
        }

        //
        // @note By creating this data separately, it is easier to track down what went wrong from the client side, instead of doing one big chunk. This default data will be used when new 
        // translations are created.  - JSolsvik 24.07.17
        //
        [HttpPost("api/{client}/default/containers")]
        public IActionResult  CreateDefaultContainers(string client, [FromBody] IEnumerable<string> defaultContainers)
        {
            // Check if any of the data is null og nullstring            
            if (defaultContainers.Where(str => str == null || str == "").Count() > 0)
                return  BadRequest();

            _clientRepo.CreateDefaultContainers(client, defaultContainers);
            return StatusCode(201);
        }

        [HttpPost("api/{client}/default/languages")] 
        public IActionResult CreateDefaultLanguages(string client, [FromBody] IEnumerable<string> defaultLanguages) 
        {
            // Check if any of the data is null og nullstring
            if (defaultLanguages.Where(str => str == null || str == "").Count() > 0)
                return  BadRequest();

            _clientRepo.CreateDefaultLanguages(client, defaultLanguages);
            return StatusCode(201);
        }
    }
}
