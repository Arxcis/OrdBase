using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrdBase.Models 
{   
    public class Translation
    {
        [Key]
        [Column(Order = 1)]
        [ForeignKey("RegisteredClient")]
        public string ClientName { get; set; }
        public RegisteredClient RegisteredClient { get; set; }

        [StringLength(32)]
        [Key]
        [Column(Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string AccessKey { get; set; }

        [Key]
        [Column(Order = 3)]
        [ForeignKey("Language")]
        public string LanguageShortName { get; set; }
        public Language Language { get; set; }

        [StringLength(2048)]
        [Required]
        public string Text { get; set; }
        
        [Required]
        public bool IsComplete { get; set; }
    }
}