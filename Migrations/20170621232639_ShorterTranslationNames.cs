using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace OrdBaseCore.Migrations
{
    public partial class ShorterTranslationNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Translation_Client_ClientName",
                table: "Translation");

            migrationBuilder.DropForeignKey(
                name: "FK_Translation_Language_LanguageShortName",
                table: "Translation");

            migrationBuilder.RenameColumn(
                name: "IsComplete",
                table: "Translation",
                newName: "Done");

            migrationBuilder.RenameColumn(
                name: "AccessKey",
                table: "Translation",
                newName: "Key");

            migrationBuilder.RenameColumn(
                name: "LanguageShortName",
                table: "Translation",
                newName: "Lang");

            migrationBuilder.RenameColumn(
                name: "ClientName",
                table: "Translation",
                newName: "Client");

            migrationBuilder.RenameColumn(
                name: "ShortName",
                table: "Language",
                newName: "Short");

            migrationBuilder.DropIndex(
                name: "IX_Translation_LanguageShortName",
                table: "Translation");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Done",
                table: "Translation",
                newName: "IsComplete");

            migrationBuilder.RenameColumn(
                name: "Key",
                table: "Translation",
                newName: "AccessKey");

            migrationBuilder.RenameColumn(
                name: "Lang",
                table: "Translation",
                newName: "LanguageShortName");

            migrationBuilder.RenameColumn(
                name: "Client",
                table: "Translation",
                newName: "ClientName");

            migrationBuilder.RenameColumn(
                name: "Short",
                table: "Language",
                newName: "ShortName");

            migrationBuilder.CreateIndex(
                name: "IX_Translation_LanguageShortName",
                table: "Translation",
                column: "LanguageShortName");

            migrationBuilder.AddForeignKey(
                name: "FK_Translation_Client_ClientName",
                table: "Translation",
                column: "ClientName",
                principalTable: "Client",
                principalColumn: "Name",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Translation_Language_LanguageShortName",
                table: "Translation",
                column: "LanguageShortName",
                principalTable: "Language",
                principalColumn: "ShortName",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
