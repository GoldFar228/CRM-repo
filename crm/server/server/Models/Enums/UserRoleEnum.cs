namespace server.Models.Enums
{
    public enum UserRoleEnum : byte
    {
        Admin = 1,
        Manager = 2,
        User = 4,
        Unauthorized = 8
    }
}
