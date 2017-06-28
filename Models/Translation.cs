using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrdBaseCore.Models 
{   
    public class Translation
    {   
        [Key]
        [Column(Order = 1)]
        [ForeignKey("Client")]
        [StringLength(127)]
        public string ClientKey { get; set; } 
        protected virtual Client Client { get; set; }


        [Key]
        [Column(Order = 2)]
        [ForeignKey("Language")]
        [StringLength(32)]
        public string LanguageKey { get; set; }
        protected virtual Language Language { get; set; }

        [Key]
        [Column(Order = 3)]
        [StringLength(127)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Container { get; set; }
        
        [Key]
        [Column(Order = 4)]
        [StringLength(127)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Key { get; set; } 

        [StringLength(255)]
        [Required]
        public string Text { get; set; }
        
        [Required]
        public bool Done { get; set; } // IsComplete
    }
}