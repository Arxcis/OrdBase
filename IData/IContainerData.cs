
using OrdBaseCore.Models;

namespace OrdBaseCore.IData
{
    public interface IContainerData
    {
    	string[] GetGroup(string clientKey, string translationKey);
    	string[] GetAll(string clientKey);
    }	
}
