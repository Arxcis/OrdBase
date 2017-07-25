using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using OrdBaseCore.Models;

namespace OrdBaseCore.IData
{
    public interface IClientData
    {
        IEnumerable<Client> Get(string name);
        IEnumerable<Client> GetAll();
        
        IActionResult Create(Client client);
        IEnumerable<string> GetDefaultLanguages(string clientId);
        IEnumerable<string> GetDefaultContainers(string clientId);        
        IActionResult CreateDefaultContainers(string clientId, IEnumerable<string> defaultContainers);
        IActionResult CreateDefaultLanguages(string clientId, IEnumerable<string> defultLanguages);
        IActionResult UpdateDefaultContainers(string clientId, IEnumerable<string> defultLanguages);
        IActionResult UpdateDefaultLanguages(string clientId, IEnumerable<string> defultLanguages);
        
    }	
}
