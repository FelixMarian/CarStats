

namespace CarStats.Data
{
    public class Account
    {
        public Guid id { get; set; }
        public String email { get; set; }
        public String username { get; set; }
        public String password { get; set; }
        public DateTime createdTime { get; set; }

        public Account(string email, string username, string password, DateTime createdTime)
        {
            id = Guid.NewGuid();
            this.email = email;
            this.username = username;
            this.password = password;
            this.createdTime = createdTime;
        }
    }
}
