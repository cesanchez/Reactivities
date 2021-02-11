using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio {get; set;}
        public string Token { get; set; }
        public string Image { get; set; }
        public virtual ICollection<UserActivity> UserActivities {get; set;}
        public virtual ICollection<Photo> Photos {get; set;}
    }
}