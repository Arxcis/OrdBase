using System;
using System.ComponentModel.DataAnnotations;

namespace OrdBase.Models 
{
	public class RegisteredClient 
	{   
        [Key]
		public int RegisteredClientId { get; set; }

        [Required]
		public string Name { get; set; }
		public string ApiKey { get; set; }

		public DateTime? LastAccess { get; set; }
		public uint? RequestCount { get; set; }
	}
}