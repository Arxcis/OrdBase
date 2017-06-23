using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrdBaseCore.Models 
{
	public class Client 
	{   
        [Key]
        [StringLength(16)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
		public string Name { get; set; }

        [StringLength(32)]
		public string ApiKey { get; set; }

		public DateTime? LastAccess { get; set; }
		public int? RequestCount { get; set; }
	}
}