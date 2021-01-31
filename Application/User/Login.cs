using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.User
{
    public class Login
    {
        public class Query : IRequest<AppUser>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class QuertValidator : AbstractValidator<Query>
        {
            public QuertValidator()
            {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Query, AppUser>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly SignInManager<AppUser> _signManager;
            private readonly IJwtGenerator _jwtGeneretor;

            public Handler(UserManager<AppUser> userManager, SignInManager<AppUser> signManager, IJwtGenerator jwtGeneretor)
            {
                _jwtGeneretor = jwtGeneretor;
                _userManager = userManager;
                _signManager = signManager;
            }
            public async Task<AppUser> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByEmailAsync(request.Email);

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.Unauthorized);
                }

                var result = await _signManager.CheckPasswordSignInAsync(user, request.Password, false);

                if (result.Succeeded)
                {
                    //Todo generate token
                    return new AppUser
                    {
                        DisplayName = user.DisplayName,
                        Token = _jwtGeneretor.CreateToken(user),
                        UserName = user.UserName
                    };
                }

                throw new RestException(HttpStatusCode.Unauthorized);
            }
        }
    }
}