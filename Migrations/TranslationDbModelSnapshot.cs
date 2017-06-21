using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using OrdBaseCore.Models;

namespace OrdBaseCore.Migrations
{
    [DbContext(typeof(TranslationDb))]
    partial class TranslationDbModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2");

            modelBuilder.Entity("OrdBaseCore.Models.Client", b =>
                {
                    b.Property<string>("Name")
                        .HasMaxLength(32);

                    b.Property<string>("ApiKey")
                        .HasMaxLength(64);

                    b.Property<DateTime?>("LastAccess");

                    b.Property<int?>("RequestCount");

                    b.HasKey("Name");

                    b.HasIndex("ApiKey")
                        .IsUnique();

                    b.ToTable("Client");
                });

            modelBuilder.Entity("OrdBaseCore.Models.Language", b =>
                {
                    b.Property<string>("ShortName")
                        .HasMaxLength(7);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(32);

                    b.HasKey("ShortName");

                    b.ToTable("Language");
                });

            modelBuilder.Entity("OrdBaseCore.Models.Translation", b =>
                {
                    b.Property<string>("ClientName");

                    b.Property<string>("LanguageShortName");

                    b.Property<string>("Container")
                        .HasMaxLength(32);

                    b.Property<string>("AccessKey")
                        .HasMaxLength(32);

                    b.Property<bool>("IsComplete");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasMaxLength(2048);

                    b.HasKey("ClientName", "LanguageShortName", "Container", "AccessKey");

                    b.HasIndex("LanguageShortName");

                    b.ToTable("Translation");
                });

            modelBuilder.Entity("OrdBaseCore.Models.Translation", b =>
                {
                    b.HasOne("OrdBaseCore.Models.Client", "Client")
                        .WithMany()
                        .HasForeignKey("ClientName")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("OrdBaseCore.Models.Language", "Language")
                        .WithMany()
                        .HasForeignKey("LanguageShortName")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
