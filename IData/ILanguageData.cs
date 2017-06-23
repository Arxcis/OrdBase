
using OrdBaseCore.Models;

namespace OrdBaseCore.IData
{
    public interface ILanguageData
    {
        Language[] GetAll();
        Language[] GetOnClient(string client);
    }	
}
