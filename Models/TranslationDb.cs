using Microsoft.EntityFrameworkCore;


namespace OrdBaseCore.Models 
{
    public class TranslationDb : DbContext 
    {

        public TranslationDb(DbContextOptions<TranslationDb> options)
            :base(options)
        {}

        public DbSet<Client> Client { get; set; }
        public DbSet<Language> Language { get; set; }
        public DbSet<Translation> Translation { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Client>()
                .HasIndex(row => row.ApiKey)
                .IsUnique();
        }
    }
}