using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace OrdBaseCore.Migrations
{
    public partial class evenshortertnames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Text",
                table: "Translation",
                newName: "Txt");

            migrationBuilder.RenameColumn(
                name: "Done",
                table: "Translation",
                newName: "Ok");

            migrationBuilder.RenameColumn(
                name: "Container",
                table: "Translation",
                newName: "Box");

            migrationBuilder.RenameColumn(
                name: "Client",
                table: "Translation",
                newName: "CId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Txt",
                table: "Translation",
                newName: "Text");

            migrationBuilder.RenameColumn(
                name: "Ok",
                table: "Translation",
                newName: "Done");

            migrationBuilder.RenameColumn(
                name: "Box",
                table: "Translation",
                newName: "Container");

            migrationBuilder.RenameColumn(
                name: "CId",
                table: "Translation",
                newName: "Client");
        }
    }
}
