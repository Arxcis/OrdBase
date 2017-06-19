using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrdBase.Models 
{   
    // @doc speed up search by proper column order - https://stackoverflow.com/questions/3048154/indexes-and-multi-column-primary-keys
    // @doc mysql multicolumn indexes https://dev.mysql.com/doc/refman/5.7/en/multiple-column-indexes.html
    public class Translation
    {
        [Key]
        [Column(Order = 1)]
        [ForeignKey("RegisteredClient")]
        public int RegisteredClientId { get; set; }
        public RegisteredClient RegisteredClient { get; set; }

        [Key]
        [Column(Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string AccessKey { get; set; }

        [Key]
        [Column(Order = 3)]
        [ForeignKey("Language")]
        public int LanguageId { get; set; }
        public Language Language { get; set; }

        [Required]
        public string Text { get; set; }
        
        [Required]
        public bool IsComplete { get; set; }
    }
}