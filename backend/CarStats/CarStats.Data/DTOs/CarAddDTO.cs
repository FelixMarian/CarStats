
namespace CarStats.Data.DTOs
{
    public class CarAddDTO
    {
 
        public String car_name { get; set; }
        public String player_uuid { get; set; }
        public CarAddDTO(string car_name, string player_uuid)
        {
            this.car_name = car_name;
            this.player_uuid = player_uuid;
        }
    }
}
