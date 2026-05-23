using System.Text.Json.Serialization;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

// Crée le builder de l'application
var builder = WebApplication.CreateBuilder(args);

// Ajoute les controllers à l'application
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Évite les boucles infinies quand il y a des relations entre les modèles
        // Exemple : User -> City -> Users -> City...
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;

        // Ignore les champs null dans la réponse JSON
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });

// Ajoute l'explorateur d'endpoints pour Swagger
builder.Services.AddEndpointsApiExplorer();

// Ajoute Swagger pour tester les API
builder.Services.AddSwaggerGen();

// Configure la connexion à SQL Server avec AppDbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Ajoute le service pour hasher les mots de passe des utilisateurs
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();

// Récupère les origines autorisées depuis appsettings.json
// Exemple : http://localhost:3000 pour React
var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>();

// Configure CORS pour autoriser le frontend à communiquer avec le backend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(allowedOrigins!)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Configure l'authentification avec JWT
builder.Services.AddAuthentication(options =>
{
    // Définit JWT Bearer comme méthode d'authentification par défaut
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    // Paramètres de validation du token JWT
    options.TokenValidationParameters = new TokenValidationParameters
    {
        // Vérifie que le token vient du bon backend
        ValidateIssuer = true,

        // Vérifie que le token est destiné à la bonne application
        ValidateAudience = true,

        // Vérifie que le token n'est pas expiré
        ValidateLifetime = true,

        // Vérifie que la signature du token est valide
        ValidateIssuerSigningKey = true,

        // Valeur attendue pour Issuer
        ValidIssuer = builder.Configuration["Jwt:Issuer"],

        // Valeur attendue pour Audience
        ValidAudience = builder.Configuration["Jwt:Audience"],

        // Clé secrète utilisée pour vérifier la signature du token
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)
        )
    };
});

// Active le système d'autorisation
builder.Services.AddAuthorization();

// Construit l'application
var app = builder.Build();

// Si on est en mode développement, active Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Crée la base de données au premier lancement si elle n'existe pas
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

// Active CORS pour permettre au frontend d'appeler le backend
app.UseCors("AllowFrontend");

// Active l'authentification
// Cela permet de lire et vérifier le token JWT
app.UseAuthentication();

// Active l'autorisation
// Cela permet de protéger les routes avec [Authorize]
app.UseAuthorization();

// Mappe les controllers aux routes API
// Exemple : AuthController devient /api/auth
app.MapControllers();

// Lance l'application
app.Run();