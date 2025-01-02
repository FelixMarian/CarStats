 
namespace CarStats.Data.DTOs
{
    public class ExpenseAddDTO
    {
        public String car_id { get; set; }
        public String title { get; set; }
        public float price { get; set; }

        public ExpenseAddDTO(string car_id, string title, float price)
        {
            this.car_id = car_id;
            this.title = title;
            this.price = price;
        }

        public ExpenseAddDTO() { }
    }
}
