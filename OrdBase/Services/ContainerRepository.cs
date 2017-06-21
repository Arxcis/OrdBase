using System.Linq;

using OrdBase.Models;
using OrdBase.IData;

namespace OrdBase.Services
{	
	// 
	// @class ContainerRepository
	//  @brief Gets the names of containers
	//
    public class ContainerRepository : IContainerData
    {
        private readonly TranslationDb _context;
        public ContainerRepository() { _context = new TranslationDb { };  }

        public string[] Get(string client, string accesskey) 
        { 
            return (from t in _context.Translation

                    where t.ClientName == client &&
                          t.AccessKey == accesskey

                    group t by t.Container into grp
                    select grp.Key )
                        .ToArray();
        }

        public string[] GetOnClient(string client) 
        {
            return (from t in _context.Translation

                    where t.ClientName == client
                    select t.Container)
                        .ToArray();
        }
    }
}