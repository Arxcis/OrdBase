using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrdBase.Models 
{
        public class Category 
        {
                [Key]
                [Column(Order = 1)]
                [ForeignKey("RegisteredClient")]
                public string ClientName { get; set; }
                public RegisteredClient RegisteredClient { get; set; }

                [Key]
                [Column(Order = 2)]
                public string Name { get; set; }
        }
}