using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class dealUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssignedToId",
                table: "Deals",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Deals_AssignedToId",
                table: "Deals",
                column: "AssignedToId");

            migrationBuilder.AddForeignKey(
                name: "FK_Deals_Clients_AssignedToId",
                table: "Deals",
                column: "AssignedToId",
                principalTable: "Clients",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Deals_Clients_AssignedToId",
                table: "Deals");

            migrationBuilder.DropIndex(
                name: "IX_Deals_AssignedToId",
                table: "Deals");

            migrationBuilder.DropColumn(
                name: "AssignedToId",
                table: "Deals");
        }
    }
}
