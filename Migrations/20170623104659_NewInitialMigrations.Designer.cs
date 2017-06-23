using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using OrdBaseCore.Models;

namespace OrdBaseCore.Migrations
{
    [DbContext(typeof(TranslationDb))]
    [Migration("20170623104659_NewInitialMigrations")]
    partial class NewInitialMigrations
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("OrdBaseCore.Models.Client", b =>
                {
                    b.Property<string>("Name")
                        .HasMaxLength(16);

                    b.Property<string>("ApiKey")
                        .HasMaxLength(32);

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
                        .HasMaxLength(8);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(32);

                    b.HasKey("Short");

                    b.ToTable("Language");
                });

            modelBuilder.Entity("OrdBaseCore.Models.Translation", b =>
                {
                    b.Property<string>("ClientName")
                        .HasMaxLength(16);

                    b.Property<string>("Lang")
                        .HasMaxLength(8);

                    b.Property<string>("Container")
                        .HasMaxLength(16);

                    b.Property<string>("Key")
                        .HasMaxLength(16);

                    b.Property<bool>("Ok");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.HasKey("ClientName", "Lang", "Container", "Key");

                    b.ToTable("Translation");
                });
        }
    }
}
