using System.Collections.Generic;
using OrdBaseCore.Models;
using Microsoft.AspNetCore.Mvc;

namespace OrdBaseCore.IData
{
    public interface IContainerData
    {
        IEnumerable<Container> Get(string containerKey);
        IEnumerable<Container> GetNonEmpty(ClientQuery query);
        IEnumerable<ClientContainer> GetClientContainers(ClientQuery query);
        IActionResult SetClientContainers(ClientQuery query, IEnumerable<ClientContainer> clientContainerArray);
    }	
}
