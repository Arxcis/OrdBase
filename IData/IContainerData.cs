
using OrdBaseCore.Models;

namespace OrdBaseCore.IData
{
    public interface IContainerData
    {
    	string[] Get(string clientKey, string translationKey);
    	string[] GetAll(string clientKey);
    }	
}
