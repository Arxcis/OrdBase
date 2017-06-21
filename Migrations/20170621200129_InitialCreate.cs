using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace OrdBaseCore.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Client",
                columns: table => new
                {
                    Name = table.Column<string>(maxLength: 32, nullable: false),
                    ApiKey = table.Column<string>(maxLength: 64, nullable: true),
                    LastAccess = table.Column<DateTime>(nullable: true),
                    RequestCount = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Client", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "Language",
                columns: table => new
                {
                    ShortName = table.Column<string>(maxLength: 7, nullable: false),
                    Name = table.Column<string>(maxLength: 32, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Language", x => x.ShortName);
                });

            migrationBuilder.CreateTable(
                name: "Translation",
                columns: table => new
                {
                    ClientName = table.Column<string>(nullable: false),
                    LanguageShortName = table.Column<string>(nullable: false),
                    Container = table.Column<string>(maxLength: 32, nullable: false),
                    AccessKey = table.Column<string>(maxLength: 32, nullable: false),
                    IsComplete = table.Column<bool>(nullable: false),
                    Text = table.Column<string>(maxLength: 2048, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Translation", x => new { x.ClientName, x.LanguageShortName, x.Container, x.AccessKey });
                    table.ForeignKey(
                        name: "FK_Translation_Client_ClientName",
                        column: x => x.ClientName,
                        principalTable: "Client",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Translation_Language_LanguageShortName",
                        column: x => x.LanguageShortName,
                        principalTable: "Language",
                        principalColumn: "ShortName",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Client_ApiKey",
                table: "Client",
                column: "ApiKey",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Translation_LanguageShortName",
                table: "Translation",
                column: "LanguageShortName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Translation");

            migrationBuilder.DropTable(
                name: "Client");

            migrationBuilder.DropTable(
                name: "Language");
        }
    }
}
