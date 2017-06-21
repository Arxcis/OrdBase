
using OrdBase.Models;

namespace OrdBase.IData
{
    public interface ILanguageData
    {
        Language[] GetAll();
        Language[] GetOnClient(string client);
    }	
}
