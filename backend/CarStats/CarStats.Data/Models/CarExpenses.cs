
using Microsoft.EntityFrameworkCore;

namespace CarStats.Data.Models
{
    [Keyless]
    public class CarExpenses
    {
        public Guid car_id { get; set; }
        public String title {  get; set; }
        public DateTime date { get; set; }
        public float price { get; set; }

        public CarExpenses(Guid car_id, string title, DateTime date, float price)
        {
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
