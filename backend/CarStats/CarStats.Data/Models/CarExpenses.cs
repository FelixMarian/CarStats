
using Microsoft.EntityFrameworkCore;

namespace CarStats.Data.Models
{
    public class CarExpenses
    {
        public String id { get; set; }
        public String car_id { get; set; }
        public String title {  get; set; }
        public String date { get; set; }
        public float price { get; set; }

        public CarExpenses(String car_id, String title, String date, float price)
        {
            this.id = Guid.NewGuid().ToString();
            this.car_id = car_id;
            this.title = title;
            this.date = date;
            this.price = price;
        }

        public CarExpenses()
        {
        }
    }
}
