
using OrdBase.Models;

namespace OrdBase.IDataStores
{
    interface IDataStoreClient
    {
    	readonly TranslationDb Context { get; }
    	
    }	
}
