 

namespace CarStats.Data.DTOs
{
    public class AccountRegisterDTO
    {
        public String email { get; set; }
        public String password { get; set; }
        public String username { get; set; }

        public AccountRegisterDTO(string email, string password, string username)
        {
            this.email = email;
            this.password = password;
            this.username = username;
        }
    }
}
