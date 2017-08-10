using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

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

		[Route("api/container")]
		public IEnumerable<Container> Get([FromQuery] string containerKey) 
		{
            return _containerRepo.Get(containerKey);
        }

        [Route("api/container/nonempty")]
        public IEnumerable<Container> GetNonEmpty([FromQuery] ClientQuery query)
        {
            return _containerRepo.GetNonEmpty(query);
        }

        [HttpGet("api/container/active")]
        public IEnumerable<Container> GetActiveContainers([FromQuery] ClientQuery query) 
        {
            return _containerRepo.GetActiveContainers(query);
        }

        [HttpPost("api/container/active")]
        public IActionResult  SetActiveContainers([FromQuery] ClientQuery query, [FromBody] string[] containerArray)
        {
            if (containerArray ==  null)
                return  BadRequest();

            return _containerRepo.SetActiveContainers(query, containerArray);
        }
    }
}
