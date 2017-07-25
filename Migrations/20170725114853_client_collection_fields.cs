using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace OrdBaseCore.Migrations
{
    public partial class client_collection_fields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Translation",
                table: "Translation");

            migrationBuilder.DropColumn(
                name: "Container",
                table: "Translation");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Client",
                newName: "Key");

            migrationBuilder.AlterColumn<string>(
                name: "LanguageKey",
                table: "Translation",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 32);

            migrationBuilder.AddColumn<string>(
                name: "ContainerKey",
                table: "Translation",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Language",
                maxLength: 64,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 127);

            migrationBuilder.AlterColumn<string>(
                name: "Key",
                table: "Language",
                maxLength: 8,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 32);

            migrationBuilder.AlterColumn<string>(
                name: "WebpageUrl",
                table: "Client",
                maxLength: 255,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ThumbnailUrl",
                table: "Client",
                maxLength: 255,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Translation",
                table: "Translation",
                columns: new[] { "ClientKey", "LanguageKey", "ContainerKey", "Key" });

            migrationBuilder.CreateTable(
                name: "ClientLanguage",
                columns: table => new
                {
                    ClientKey = table.Column<string>(nullable: false),
                    LanguageKey = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientLanguage", x => new { x.ClientKey, x.LanguageKey });
                    table.ForeignKey(
                        name: "FK_ClientLanguage_Client_ClientKey",
                        column: x => x.ClientKey,
                        principalTable: "Client",
                        principalColumn: "Key",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClientLanguage_Language_LanguageKey",
                        column: x => x.LanguageKey,
                        principalTable: "Language",
                        principalColumn: "Key",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Container",
                columns: table => new
                {
                    ContainerKey = table.Column<string>(maxLength: 64, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Container", x => x.ContainerKey);
                });

            migrationBuilder.CreateTable(
                name: "ClientContainer",
                columns: table => new
                {
                    ClientKey = table.Column<string>(nullable: false),
                    ContainerKey = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientContainer", x => new { x.ClientKey, x.ContainerKey });
                    table.ForeignKey(
                        name: "FK_ClientContainer_Client_ClientKey",
                        column: x => x.ClientKey,
                        principalTable: "Client",
                        principalColumn: "Key",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClientContainer_Container_ContainerKey",
                        column: x => x.ContainerKey,
                        principalTable: "Container",
                        principalColumn: "ContainerKey",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Translation_ContainerKey",
                table: "Translation",
                column: "ContainerKey");

            migrationBuilder.CreateIndex(
                name: "IX_Translation_LanguageKey",
                table: "Translation",
                column: "LanguageKey");

            migrationBuilder.CreateIndex(
                name: "IX_ClientContainer_ContainerKey",
                table: "ClientContainer",
                column: "ContainerKey");

            migrationBuilder.CreateIndex(
                name: "IX_ClientLanguage_LanguageKey",
                table: "ClientLanguage",
                column: "LanguageKey");

            migrationBuilder.AddForeignKey(
                name: "FK_Translation_Client_ClientKey",
                table: "Translation",
                column: "ClientKey",
                principalTable: "Client",
                principalColumn: "Key",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Translation_Container_ContainerKey",
                table: "Translation",
                column: "ContainerKey",
                principalTable: "Container",
                principalColumn: "ContainerKey",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Translation_Language_LanguageKey",
                table: "Translation",
                column: "LanguageKey",
                principalTable: "Language",
                principalColumn: "Key",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Translation_Client_ClientKey",
                table: "Translation");

            migrationBuilder.DropForeignKey(
                name: "FK_Translation_Container_ContainerKey",
                table: "Translation");

            migrationBuilder.DropForeignKey(
                name: "FK_Translation_Language_LanguageKey",
                table: "Translation");

            migrationBuilder.DropTable(
                name: "ClientContainer");

            migrationBuilder.DropTable(
                name: "ClientLanguage");

            migrationBuilder.DropTable(
                name: "Container");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Translation",
                table: "Translation");

            migrationBuilder.DropIndex(
                name: "IX_Translation_ContainerKey",
                table: "Translation");

            migrationBuilder.DropIndex(
                name: "IX_Translation_LanguageKey",
                table: "Translation");

            migrationBuilder.DropColumn(
                name: "ContainerKey",
                table: "Translation");

            migrationBuilder.RenameColumn(
                name: "Key",
                table: "Client",
                newName: "Name");

            migrationBuilder.AlterColumn<string>(
                name: "LanguageKey",
                table: "Translation",
                maxLength: 32,
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<string>(
                name: "Container",
                table: "Translation",
                maxLength: 127,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Language",
                maxLength: 127,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 64);

            migrationBuilder.AlterColumn<string>(
                name: "Key",
                table: "Language",
                maxLength: 32,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 8);

            migrationBuilder.AlterColumn<string>(
                name: "WebpageUrl",
                table: "Client",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 255,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ThumbnailUrl",
                table: "Client",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 255,
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Translation",
                table: "Translation",
                columns: new[] { "ClientKey", "LanguageKey", "Container", "Key" });
        }
    }
}
