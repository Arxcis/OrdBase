
using OrdBase.Models;

namespace OrdBase.IDataStores
{
    interface IDataStoreLanguage
    {
    	readonly TranslationDb Context { get; }
    }	
}
