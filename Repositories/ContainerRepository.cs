using System.Linq;

using OrdBaseCore.Models;
using OrdBaseCore.IData;

namespace OrdBaseCore.Repositories
{	
	// 
	// @class ContainerRepository
	//  @brief Gets the names of containers
	//
    public class ContainerRepository : IContainerData
    {
        private readonly TranslationDb _context;

        public ContainerRepository (TranslationDb context) 
        { _context = context; }
        
        //
        // GET
        //  @note This repository will not have any create,update,delete, because containers do not have their own 
        //          table in the repository, but are part of the Translation table.
        //
        public string[] Get(string clientKey, string translationKey) 
        { 
            return (from t in _context.Translation
                    where t.ClientKey == clientKey && t.Key == translationKey
                    group t by t.ContainerKey into grp
                    select grp.Key)
                        .Distinct()
                        .ToArray();
        }

        public string[] GetAll(string client) 
        {
            return (from t in _context.Translation
                    where t.ClientKey == client
                    select t.ContainerKey)
                        .Distinct()
                        .ToArray();
                        
        }
    }
}