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
        // GET api/clients/*
        //
    	[HttpGet("api/clients/{clientKey}")]
    	public IEnumerable<Client> Get(string clientKey)
    	{
    		return _clientRepo.Get(clientKey);
    	}

        [HttpGet("api/clients/{clientKey}/containers")]        
        public IEnumerable<string> GetContainers(string clientKey) 
        {
            return _clientRepo.GetContainers(clientKey);
        }

        [HttpGet("api/clients/{clientKey}/languages")] 
        public IEnumerable<string> GetLanguages(string clientKey) 
        {
            return _clientRepo.GetLanguages(clientKey);
        }

        //
        // CREATE, UPDATE, DELETE api/clients/*
        //
        [HttpPost("api/clients")]
        public IActionResult Create([FromBody] Client client) 
        {   
            if (client == null)
                return  BadRequest();

            _clientRepo.Create(client);
            return StatusCode(201);
        }


        [HttpPut("api/clients/{clientKey}")]
        public IActionResult Update(string clientKey, [FromBody] Client client)
        {
            if (client == null || client.Key != clientKey) 
                return BadRequest();
            return _clientRepo.Update(client);
        }        

        [HttpDelete("api/clients/{clientKey}")]
        public IActionResult Delete(string clientKey) 
        {
            return _clientRepo.Delete(clientKey);
        }

        //
        // SET clients/containers and languages 
        //
        [HttpPost("api/clients/{clientKey}/containers")]
        public IActionResult  SetContainers(string clientKey, [FromBody] string[] containerArray)
        {
            if (containerArray == null)
                return  BadRequest();

            _clientRepo.SetContainers(clientKey, containerArray);
            return StatusCode(201);
        }

        [HttpPost("api/clients/{clientKey}/languages")]         
        public IActionResult SetLanguages(string clientKey, [FromBody] string[] languageArray) 
        {
            if (languageArray == null)
                return  BadRequest();

            _clientRepo.SetLanguages(clientKey, languageArray);
            return StatusCode(201);
        }
    }
}
