using System.Linq;

using OrdBaseCore.Models;
using OrdBaseCore.IData;

namespace OrdBaseCore.Services
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
        public string[] Get(string client, string accesskey) 
        { 
            return (from t in _context.Translation

                    where t.CId == client &&
                          t.Key == accesskey

                    group t by t.Box into grp
                    select grp.Key)
                        .Distinct()
                        .ToArray();
        }

        public string[] GetOnClient(string client) 
        {
            return (from t in _context.Translation

                    where t.CId == client
                    select t.Box)
                        .Distinct()
                        .ToArray();
                        
        }
    }
}