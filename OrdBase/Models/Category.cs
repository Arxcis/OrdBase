using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrdBase.Models 
{
	public class Category 
	{
        [Key]
		public int CategoryId { get; set; }

        [Required]
        public string Name { get; set; }

        [ForeignKey("RegisteredClient")]
        public int RegisteredClientId { get; set; }
		public RegisteredClient RegisteredClient { get; set; }
	}
}