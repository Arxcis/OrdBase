using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

using OrdBaseCore.Models;
using OrdBaseCore.IData;

// CRUD operations - @doc https://docs.microsoft.com/en-us/aspnet/core/tutorials/web-api-vsc#implement-the-other-crud-operations|

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
        // GET api/client/*
        //
    	[HttpGet("api/client")]
    	public IEnumerable<Client> Get([FromQuery] string clientKey)
    	{
    		return _clientRepo.Get(clientKey);
    	}

        [HttpGet("api/client/containers")]        
        public IEnumerable<string> GetContainers([FromQuery] string clientKey) 
        {
            return _clientRepo.GetContainers(clientKey);
        }

        [HttpGet("api/client/languages")] 
        public IEnumerable<string> GetLanguages([FromQuery] string clientKey) 
        {
            return _clientRepo.GetLanguages(clientKey);
        }

        //
        // CREATE, UPDATE, DELETE api/client/*
        //
        [HttpPost("api/client")]
        public IActionResult Create([FromBody] Client client) 
        {   
            if (client == null)
                return  BadRequest();

            _clientRepo.Create(client);
            return StatusCode(201);
        }

        [HttpPut("api/client")]
        public IActionResult Update([FromQuery] string clientKey, [FromBody] Client client)
        {
            if (client == null || client.Key != clientKey) 
                return BadRequest();

            return _clientRepo.Update(clientKey, client);
        }        

        [HttpDelete("api/client")]
        public IActionResult Delete([FromQuery] string clientKey) 
        {
            return _clientRepo.Delete(clientKey);
        }

        //
        // SET containers and languages connected to client
        //
        [HttpPost("api/client/containers")]
        public IActionResult  SetContainers([FromQuery] string clientKey, [FromBody] string[] containerArray)
        {
            if (containerArray ==  null)
                return  BadRequest();

            _clientRepo.SetContainers(clientKey, containerArray);
            return StatusCode(201);
        }

        [HttpPost("api/client/languages")]         
        public IActionResult SetLanguages([FromQuery] string clientKey, [FromBody] string[] languageArray) 
        {
            if (languageArray == null)
                return  BadRequest();

            _clientRepo.SetLanguages(clientKey, languageArray);
            return StatusCode(201);
        }
    }
}
