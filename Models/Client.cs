using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrdBaseCore.Models 
{
	public class Client 
	{   
		//
		// Essential properties
		//
        [Key]
        [StringLength(127)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
		public string Name { get; set; }

        [StringLength(127)]
		public string ApiKey { get; set; }

		//
		// Admin properties
		//
		public string WebpageUrl {get; set; }	

		public string ThumbnailUrl { get; set; }

		public DateTime? LastAccess { get; set; }
		public int? RequestCount { get; set; }
	}
}