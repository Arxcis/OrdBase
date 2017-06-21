using System.Web.Http;

using OrdBase.Models;
using OrdBase.IData;

namespace OrdBase.Controllers
{
    public class ClientController : ApiController, IClientData
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
