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
        
        public string[] Get(string containerKey)
        {
            return _context.Container.Select(c => c.Key).ToArray();
        }
    
        //
        // TESTDATA add
        //
        public static void AddTestData(TranslationDb context) 
        {
            context.Container.AddRange(
                new Container { Key = "Main"},
                new Container { Key = "Special"}                
            );
        }
    }
}