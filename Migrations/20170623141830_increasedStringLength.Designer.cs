using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using OrdBaseCore.Models;

namespace OrdBaseCore.Migrations
{
    [DbContext(typeof(TranslationDb))]
    [Migration("20170623141830_increasedStringLength")]
    partial class increasedStringLength
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2");

            modelBuilder.Entity("OrdBaseCore.Models.Client", b =>
                {
                    b.Property<string>("Name")
                        .HasMaxLength(127);

                    b.Property<string>("ApiKey")
                        .HasMaxLength(127);

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
                        .HasMaxLength(32);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(127);

                    b.HasKey("Short");

                    b.ToTable("Language");
                });

            modelBuilder.Entity("OrdBaseCore.Models.Translation", b =>
                {
                    b.Property<string>("ClientName")
                        .HasMaxLength(127);

                    b.Property<string>("Lang")
                        .HasMaxLength(32);

                    b.Property<string>("Container")
                        .HasMaxLength(127);

                    b.Property<string>("Key")
                        .HasMaxLength(127);

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
