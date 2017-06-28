using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace OrdBaseCore.Models
{
    public class ClientLanguage 
    {   
        
        [Key]
        [Column(Order = 1)]
        [ForeignKey("Client")]
        public int ClientId { get; set; }
        protected virtual Client Client { get; set; }

        [Key]
        [Column(Order = 2)]
        [ForeignKey("Language")]
        public int LanguageId { get; set; }
        protected virtual Language language { get; set; }
    }
}