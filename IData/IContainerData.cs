using System.Collections.Generic;
using OrdBaseCore.Models;
using Microsoft.AspNetCore.Mvc;

namespace OrdBaseCore.IData
{
    public interface IContainerData
    {
        IEnumerable<Container> Get(string containerKey);
        IEnumerable<Container> GetNoEmpty(string clientKey);
        IEnumerable<Container> GetActiveContainers(ClientQuery query);
        IActionResult SetActiveContainers(ClientQuery query, string[] containerArray);
    }	
}
