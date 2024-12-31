using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStats.Data.DTOs
{
    public class AccountLoginDTO
    {
        public String email { get; set; }
        public String password { get; set; }

        public AccountLoginDTO(string email, string password)
        {
            this.email = email;
            this.password = password;
        }
    }
}
