
using OrdBase.Models;

namespace OrdBase.IData
{
    public interface IContainerData
    {
    	string[] Get(string client, string accesskey);
    	string[] GetOnClient(string client);
    }	
}
