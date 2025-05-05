using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class ChangedTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Clients_Users_CreatedBy",
                table: "Clients");

            migrationBuilder.DropForeignKey(
                name: "FK_Deals_Users_CreatedBy",
                table: "Deals");

            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Clients_AssignedTo",
                table: "Notes");

            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Users_CreatedBy",
                table: "Notes");

            migrationBuilder.RenameColumn(
                name: "CreatedBy",
                table: "Notes",
                newName: "CreatedById");

            migrationBuilder.RenameColumn(
                name: "AssignedTo",
                table: "Notes",
                newName: "AssignedToId");

            migrationBuilder.RenameIndex(
                name: "IX_Notes_CreatedBy",
                table: "Notes",
                newName: "IX_Notes_CreatedById");

            migrationBuilder.RenameIndex(
                name: "IX_Notes_AssignedTo",
                table: "Notes",
                newName: "IX_Notes_AssignedToId");

            migrationBuilder.RenameColumn(
                name: "CreatedBy",
                table: "Deals",
                newName: "CreatedById");

            migrationBuilder.RenameIndex(
                name: "IX_Deals_CreatedBy",
                table: "Deals",
                newName: "IX_Deals_CreatedById");

            migrationBuilder.RenameColumn(
                name: "CreatedBy",
                table: "Clients",
                newName: "CreatedById");

            migrationBuilder.RenameIndex(
                name: "IX_Clients_CreatedBy",
                table: "Clients",
                newName: "IX_Clients_CreatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Clients_Users_CreatedById",
                table: "Clients",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Deals_Users_CreatedById",
                table: "Deals",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Clients_AssignedToId",
                table: "Notes",
                column: "AssignedToId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Users_CreatedById",
                table: "Notes",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Clients_Users_CreatedById",
                table: "Clients");

            migrationBuilder.DropForeignKey(
                name: "FK_Deals_Users_CreatedById",
                table: "Deals");

            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Clients_AssignedToId",
                table: "Notes");

            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Users_CreatedById",
                table: "Notes");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Notes",
                newName: "CreatedBy");

            migrationBuilder.RenameColumn(
                name: "AssignedToId",
                table: "Notes",
                newName: "AssignedTo");

            migrationBuilder.RenameIndex(
                name: "IX_Notes_CreatedById",
                table: "Notes",
                newName: "IX_Notes_CreatedBy");

            migrationBuilder.RenameIndex(
                name: "IX_Notes_AssignedToId",
                table: "Notes",
                newName: "IX_Notes_AssignedTo");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Deals",
                newName: "CreatedBy");

            migrationBuilder.RenameIndex(
                name: "IX_Deals_CreatedById",
                table: "Deals",
                newName: "IX_Deals_CreatedBy");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Clients",
                newName: "CreatedBy");

            migrationBuilder.RenameIndex(
                name: "IX_Clients_CreatedById",
                table: "Clients",
                newName: "IX_Clients_CreatedBy");

            migrationBuilder.AddForeignKey(
                name: "FK_Clients_Users_CreatedBy",
                table: "Clients",
                column: "CreatedBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Deals_Users_CreatedBy",
                table: "Deals",
                column: "CreatedBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Clients_AssignedTo",
                table: "Notes",
                column: "AssignedTo",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Users_CreatedBy",
                table: "Notes",
                column: "CreatedBy",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
