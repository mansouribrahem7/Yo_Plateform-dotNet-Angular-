using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Projects.Migrations
{
    /// <inheritdoc />
    public partial class seeding : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Projects",
                columns: new[] { "Id", "Date", "Name", "Type" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 9, 19, 15, 58, 10, 576, DateTimeKind.Local).AddTicks(9411), "Project 1", "Type 1" },
                    { 2, new DateTime(2023, 9, 19, 15, 58, 10, 576, DateTimeKind.Local).AddTicks(9470), "Project 2", "Type 2" },
                    { 3, new DateTime(2023, 9, 19, 15, 58, 10, 576, DateTimeKind.Local).AddTicks(9472), "Project 3", "Type 3" },
                    { 4, new DateTime(2023, 9, 19, 15, 58, 10, 576, DateTimeKind.Local).AddTicks(9474), "Project 4", "Type 4" },
                    { 5, new DateTime(2023, 9, 19, 15, 58, 10, 576, DateTimeKind.Local).AddTicks(9476), "Project 5", "Type 5" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 5);
        }
    }
}
