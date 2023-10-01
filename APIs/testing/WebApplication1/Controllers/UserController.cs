using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualBasic;
using Projects.Dtos;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configration;
        private readonly UserManager<User> _userManager;

        public UserController(IConfiguration configration,UserManager<User> userManager)
        {
            _configration = configration;
            _userManager = userManager;
        }
        #region staticLogin
        [HttpPost]
        [Route("StaticLogin")]
        public ActionResult<TokenDto> StaticLogin(LoginDto credentials)
        {
            if (credentials.userName != "admin" && credentials.password != "password")
            {
                return BadRequest();
            }
            //claims--secret key -- hashing alg -- hashing result 

            //claimsList 
            var claimsList = new List<Claim>()
            {
                new Claim (ClaimTypes.NameIdentifier, "id"),
                new Claim (ClaimTypes.Role, "Manager"),
            };
            //get secret key and creating signing creds 
            string secretKeyString = _configration.GetValue<string>("secret_key")!;
            byte[] keyInBytes = Encoding.ASCII.GetBytes(secretKeyString);
            var key = new SymmetricSecurityKey(keyInBytes);
            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            //creating token 
            var expiry = DateTime.Now.AddMinutes(350);
            var jwt = new JwtSecurityToken(
                claims: claimsList,
                signingCredentials: signingCredentials,
                expires: expiry
                );
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenString = tokenHandler.WriteToken(jwt);
            return new TokenDto { Token = tokenString, };
        }
        #endregion

        #region Register
        ///localhost:44377/api/User/register
        [HttpPost]
        [Route("register")]
        public async Task <ActionResult> Register (RegisterDto registerDto)
        {
            var newUser = new User
            {
                UserName = registerDto.UserName,
                Email = registerDto.Email,
            };
           var result = await _userManager.CreateAsync(newUser, registerDto.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
                
            }
            var claims = new List<Claim>()
            {
                new Claim (ClaimTypes.NameIdentifier, newUser.Id),
                new Claim (ClaimTypes.Role, "User")

            };
            await _userManager.AddClaimsAsync(newUser,claims);

            return NoContent();

        }
        #endregion

        #region Login
        [HttpPost]
        [Route("login")]
        ///localhost:44377/api/User/login

        public async Task<ActionResult<TokenDto>> Login(LoginDto creds)
        {
            User? user=await _userManager.FindByNameAsync(creds.userName);
            if (user is null)
            {
                return BadRequest();  
            }
            bool isAuthenticated = await _userManager.CheckPasswordAsync(user, creds.password);
            if (!isAuthenticated)
            {
                return BadRequest();
            }
            var claimsList = await _userManager.GetClaimsAsync(user);

            //get secret key and creating signing creds 
            string secretKeyString = _configration.GetValue<string>("secret_key")!;
            byte[] keyInBytes = Encoding.ASCII.GetBytes(secretKeyString);
            var key = new SymmetricSecurityKey(keyInBytes);
            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            //creating token 
            var expiry = DateTime.Now.AddMinutes(350);
            var jwt = new JwtSecurityToken(
                claims: claimsList,
                signingCredentials: signingCredentials,
                expires: expiry
                );
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenString = tokenHandler.WriteToken(jwt);
            return new TokenDto { Token = tokenString, Epirey= expiry };


        }
        #endregion
    }
}
