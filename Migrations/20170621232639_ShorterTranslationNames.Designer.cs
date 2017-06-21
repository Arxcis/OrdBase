using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using OrdBaseCore.Models;

namespace OrdBaseCore.Migrations
{
    [DbContext(typeof(TranslationDb))]
    [Migration("20170621232639_ShorterTranslationNames")]
    partial class ShorterTranslationNames
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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
                    b.Property<string>("Short")
                        .HasMaxLength(7);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(32);

                    b.HasKey("Short");

                    b.ToTable("Language");
                });

            modelBuilder.Entity("OrdBaseCore.Models.Translation", b =>
                {
                    b.Property<string>("Client");

                    b.Property<string>("Lang");

                    b.Property<string>("Container")
                        .HasMaxLength(32);

                    b.Property<string>("Key")
                        .HasMaxLength(32);

                    b.Property<bool>("Done");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasMaxLength(2048);

                    b.HasKey("Client", "Lang", "Container", "Key");

                    b.ToTable("Translation");
                });
        }
    }
}
