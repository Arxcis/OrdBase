using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrdBase.Models 
{
        public class Category 
        {       
                // @example: Difi, FMSF
                [Index("IndexClientCategories", 1, IsUnique = true)]
                [Key]
                [Column(Order = 1)]
                [ForeignKey("RegisteredClient")]
                public string ClientName { get; set; }
                public RegisteredClient RegisteredClient { get; set; }
                
                // @example: ud890fgudf1904rtyhgn
                [StringLength(32)]
                [Key]
                [Column(Order = 2)]
                [DatabaseGenerated(DatabaseGeneratedOption.None)]
                public string AccessKey { get; set; }
                
                // @example: Editor view
                [Index("IndexClientCategories", 2, IsUnique = true)]
                [StringLength(32)]
                [Key]
                [Column(Order = 3)]
                public string Name { get; set; }
        }
}