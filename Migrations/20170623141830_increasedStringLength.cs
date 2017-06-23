using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace OrdBaseCore.Migrations
{
    public partial class increasedStringLength : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Key",
                table: "Translation",
                maxLength: 127,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 16);

            migrationBuilder.AlterColumn<string>(
                name: "Container",
                table: "Translation",
                maxLength: 127,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 16);

            migrationBuilder.AlterColumn<string>(
                name: "Lang",
                table: "Translation",
                maxLength: 32,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 8);

            migrationBuilder.AlterColumn<string>(
                name: "ClientName",
                table: "Translation",
                maxLength: 127,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 16);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Language",
                maxLength: 127,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 32);

            migrationBuilder.AlterColumn<string>(
                name: "Short",
                table: "Language",
                maxLength: 32,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 8);

            migrationBuilder.AlterColumn<string>(
                name: "ApiKey",
                table: "Client",
                maxLength: 127,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 32,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Client",
                maxLength: 127,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 16);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Key",
                table: "Translation",
                maxLength: 16,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 127);

            migrationBuilder.AlterColumn<string>(
                name: "Container",
                table: "Translation",
                maxLength: 16,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 127);

            migrationBuilder.AlterColumn<string>(
                name: "Lang",
                table: "Translation",
                maxLength: 8,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 32);

            migrationBuilder.AlterColumn<string>(
                name: "ClientName",
                table: "Translation",
                maxLength: 16,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 127);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Language",
                maxLength: 32,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 127);

            migrationBuilder.AlterColumn<string>(
                name: "Short",
                table: "Language",
                maxLength: 8,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 32);

            migrationBuilder.AlterColumn<string>(
                name: "ApiKey",
                table: "Client",
                maxLength: 32,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 127,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Client",
                maxLength: 16,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 127);
        }
    }
}
