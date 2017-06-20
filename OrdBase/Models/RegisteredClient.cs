using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrdBase.Models 
{
	public class RegisteredClient 
	{   
        [StringLength(32)]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
		public string Name { get; set; }

        [StringLength(64)]
		[Index(IsUnique = true)]
		public string ApiKey { get; set; }

		public DateTime? LastAccess { get; set; }
		public int? RequestCount { get; set; }
	}
}