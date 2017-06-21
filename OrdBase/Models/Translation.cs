using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrdBase.Models 
{   
    public class Translation
    {
        [Key]
        [Column(Order = 1)]
        [ForeignKey("Client")]
        public string ClientName { get; set; }
        public Client Client { get; set; }

        [Key]
        [Column(Order = 2)]
        [ForeignKey("Language")]
        public string LanguageShortName { get; set; }
        public Language Language { get; set; }

        [Key]
        [Column(Order = 3)]
        [StringLength(32)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Container { get; set; }

        [Key]
        [Column(Order = 4)]
        [StringLength(32)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string AccessKey { get; set; }


        [StringLength(2048)]
        [Required]
        public string Text { get; set; }
        
        [Required]
        public bool IsComplete { get; set; }
    }
}