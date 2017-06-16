using System.Collections.Generic;
using OrdBase.Models;

namespace OrdBase.ViewModels
{
	public class AppViewModel 
	{
        public string ClientName { get; set;  }
		public IEnumerable<StringCategory> Categories   { get; set; }
		public IEnumerable<Translation>    Translations { get; set; }
	}
}