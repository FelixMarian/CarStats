 
namespace CarStats.Data.DTOs
{
    public class GetCarDTO
    {
        public String player_id { get; set; }

        public GetCarDTO(string player_id)
        {
            this.player_id = player_id;
        }
    }
}
