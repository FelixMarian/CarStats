namespace CarStats.Data.Models
{
    public class Account
    {
        public String id { get; set; }
        public string email { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public DateTime createdTime { get; set; }



        public Account(string email, string username, string password, DateTime createdTime)
        {
            id = Guid.NewGuid().ToString();
            this.email = email;
            this.username = username;
            this.password = password;
            this.createdTime = createdTime;
        }

        public Account()
        {
        }
    }
}
