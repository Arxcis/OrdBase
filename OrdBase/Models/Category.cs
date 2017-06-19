using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrdBase.Models 
{
        public class Category 
        {
                [Key]
                [Column(Order = 1)]
                [ForeignKey("RegisteredClient")]
                [Index("IX_ClientCategories", 1)]
                public string ClientName { get; set; }
                public RegisteredClient RegisteredClient { get; set; }

                [Key]
                [Column(Order = 2)]
                [DatabaseGenerated(DatabaseGeneratedOption.None)]
                public string AccessKey { get; set; }

                [Key]
                [Column(Order = 3)]
                [Index("IX_ClientCategories", 2)]
                public string Name { get; set; }
        }
}