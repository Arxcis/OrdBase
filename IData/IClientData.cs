using Microsoft.AspNetCore.Mvc;
using OrdBaseCore.Models;

namespace OrdBaseCore.IData
{
    public interface IClientData
    {
        Client[] Get(string name);
        Client[] GetAll();
        
        IActionResult Create(Client client);
    }	
}
