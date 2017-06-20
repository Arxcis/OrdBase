using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrdBase.Models 
{
	public class RegisteredClient 
	{   
        [MaxLength(32), MinLength(0)]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
		public string Name { get; set; }

        [MaxLength(64), MinLength(0)]
		[Index(IsUnique = true)]
		public string ApiKey { get; set; }

		public DateTime? LastAccess { get; set; }
		public int? RequestCount { get; set; }
	}
}