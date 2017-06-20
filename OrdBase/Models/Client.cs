using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrdBase.Models 
{
	public class Client 
	{   
        [Key]
        [StringLength(32)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
		public string Name { get; set; }

        [StringLength(64)]
		[Index(IsUnique = true)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
		public string ApiKey { get; set; }

		public DateTime? LastAccess { get; set; }
		public int? RequestCount { get; set; }
	}
}