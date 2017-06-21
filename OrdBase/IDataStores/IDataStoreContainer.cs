
using OrdBase.Models;

namespace OrdBase.IDataStores
{
    interface IDataStoreContainer
    {
    	string[] Get(string client, string accesskey);
    	string[] GetOnClient(string client);
    }	
}
