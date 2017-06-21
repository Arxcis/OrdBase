using System.Web.Http;

using OrdBase.Models;
using OrdBase.IDataStores;

namespace OrdBase.Controllers
{
	[RoutePrefix("api/client")]
    public class ClientController : ApiController
    {
        private IDataStoreClient _clientRepo { get; }

        public ClientController(IDataStoreClient clientRepo)
        {
            _clientRepo = clientRepo;
        }

    	[Route("")]
    	public Client[] GetAll()
    	{
    		return _clientRepo.GetAll();
    	}

    	[Route("{name}")]
    	public Client[] Get(string name) 
    	{
            return _clientRepo.Get(name);
    	}
    }
}
