using Microsoft.AspNetCore.Mvc;
using OrdBaseCore.Models;
using OrdBaseCore.IData;

namespace OrdBaseCore.Controllers
{
    public class ClientController : Controller, IClientData
    {
        private readonly IClientData _clientRepo;

        public ClientController(IClientData clientRepo)
        {
            _clientRepo = clientRepo;
        }

    	[Route("api/client")]
    	public Client[] GetAll()
    	{
    		return _clientRepo.GetAll();
    	}

    	[Route("api/{client}")]
    	public Client[] Get(string client) 
    	{
            return _clientRepo.Get(client);
    	}
    }
}
