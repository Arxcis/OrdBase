using System;

namespace OrdBase.Models 
{
	public class RegisteredClient 
	{
		public int RegisteredClientId { get; set; }
		public string Name { get; set; }
		public string ApiKey { get; set; }
	
		public DateTime LastAccess { get; set; }
		public UInt32 RequestCount { get; set; }
	}
}