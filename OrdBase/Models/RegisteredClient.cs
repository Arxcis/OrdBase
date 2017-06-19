using System;
using System.ComponentModel.DataAnnotations;

namespace OrdBase.Models 
{
	public class RegisteredClient 
	{   
        [MaxLength(32), MinLength(0)]
        [Key]
		public string Name { get; set; }

        [MaxLength(64), MinLength(0)]
		[Index(IsUnique = True)]
		public string ApiKey { get; set; }

		public DateTime? LastAccess { get; set; }
		public uint? RequestCount { get; set; }
	}
}