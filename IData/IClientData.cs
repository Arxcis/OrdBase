using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using OrdBaseCore.Models;

namespace OrdBaseCore.IData
{
    public interface IClientData
    {
        // GET Client stuff
        IEnumerable<Client> Get(string clientKey);
        IEnumerable<string> GetLanguages(string clientKey);
        IEnumerable<string> GetContainers(string clientKey); 

        //
        // CREATE UPDATE DELETE client
        //
        IActionResult Create(Client client);
        IActionResult Update(Client client);
        IActionResult Delete(string clientKey);
       
        //
        // SET Containers and languages connected to client
        //
        IActionResult SetContainers(string clientKey, IEnumerable<string> containerArray);
        IActionResult SetLanguages(string clientKey, IEnumerable<string> languageArray);
    }	
}
