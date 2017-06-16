using System;

namespace OrdBase.Models 
{
	public class StringCategory 
	{
		public int StringCategoryId   { get; set; }
        public int RegisteredClientId { get; set; }

		public string Name { get; set; }
		public virtual RegisteredClient RegisteredClient { get; set; }
	}
}