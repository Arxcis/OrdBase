using System;
using System.ComponentModel.DataAnnotations;

namespace OrdBase.Models 
{
	public class RegisteredClient 
	{   
        [Key]
		public string Name { get; set; }

		[Index(IsUnique = True)]
		public string ApiKey { get; set; }

		public DateTime? LastAccess { get; set; }
		public uint? RequestCount { get; set; }
	}
}