using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class dealUpdateNonNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Deals_Clients_AssignedToId",
                table: "Deals");

            migrationBuilder.AlterColumn<int>(
                name: "AssignedToId",
                table: "Deals",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Deals_Clients_AssignedToId",
                table: "Deals",
                column: "AssignedToId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Deals_Clients_AssignedToId",
                table: "Deals");

            migrationBuilder.AlterColumn<int>(
                name: "AssignedToId",
                table: "Deals",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Deals_Clients_AssignedToId",
                table: "Deals",
                column: "AssignedToId",
                principalTable: "Clients",
                principalColumn: "Id");
        }
    }
}
