using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrdBaseCore.Models 
{   
    public class Translation
    {
        [ForeignKey("Client")]
        [StringLength(127)]
        public string ClientName { get; set; } // ClientName
        protected virtual Client Client { get; set; }

        [ForeignKey("Language")]
        [StringLength(32)]
        public string Lang { get; set; } // LanguageShortName
        protected virtual Language Language { get; set; }

        [StringLength(127)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Container { get; set; }
        
        [Column(Order = 4)]
        [StringLength(127)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Key { get; set; } // AccessKey

        [StringLength(255)]
        [Required]
        public string Text { get; set; }
        
        [Required]
        public bool Ok { get; set; } // IsComplete
    }
}