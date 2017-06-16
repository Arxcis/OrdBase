using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace OrdBase.Models 
{
    //
    // @brief Setting up Entity Framework tables
    // @doc page. 77, ASP.NET MVC 4
    //
    public class TranslationDb : DbContext
    {
        public DbSet<RegisteredClient> RegisteredClient { get; set; }
        public DbSet<Language>         Language { get; set; }
        public DbSet<StringCategory>   StringCategory { get; set; }
        public DbSet<Translation>      Translation { get; set; }
        public DbSet<TranslationStringCategory> TranslationStringCategory { get; set; }


        //
        // @doc https://stackoverflow.com/questions/12868912/specify-on-delete-no-action-in-asp-net-mvc-4-c-sharp-code-first
        //
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // base.OnModelCreating(modelBuilder); //@note not sure if this is necesarry
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
           // modelBuilder.Entity<StringCategory>()
           //     .HasRequired(f => f.RegisteredClient)
           //     .WithRequiredDependent()
           //     .WillCascadeOnDelete(false);


            //modelBuilder.StringCategory
        }
    }
}