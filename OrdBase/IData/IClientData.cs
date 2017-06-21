
using OrdBase.Models;

namespace OrdBase.IData
{
    public interface IClientData
    {
        Client[] Get(string name);
        Client[] GetAll();
    }	
}
