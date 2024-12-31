using Microsoft.EntityFrameworkCore;

namespace CarStats.Data.Models
{
    public class Car
    {
        public String player_id { get; set; }
        public String id { get; set; }
        public String car_name{ get; set; }
        public DateTime created_time{ get; set; }
        public DateTime updated_time { get; set; }

        public Car(String player_id, String car_name)
        {
            this.id = Guid.NewGuid().ToString();
            this.player_id = player_id;
            this.car_name = car_name;
            this.created_time = DateTime.Now;
            this.updated_time = DateTime.Now;
        }

        public Car()
        {
        }
    }
}
