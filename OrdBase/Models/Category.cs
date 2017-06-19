using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrdBase.Models 
{
        public class Category 
        {       
                [Key]
                [Column(Order = 1)]
                [ForeignKey("RegisteredClient")]
                [Index("IndexClientCategories", 1, IsUnique=True)]
                public string ClientName { get; set; }
                public RegisteredClient RegisteredClient { get; set; }

                [MaxLength(32), MinLength(0)]
                [Key]
                [Column(Order = 2)]
                [DatabaseGenerated(DatabaseGeneratedOption.None)]
                public string AccessKey { get; set; }

                [MaxLength(32), MinLength(0)]
                [Key]
                [Column(Order = 3)]
                [Index("IndexClientCategories", 2, IsUnique=True)]
                public string Name { get; set; }
        }
}