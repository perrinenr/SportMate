/*
AppDbContext.cs est le fichier qui fais un lien entre ton backend C# et ta base de données SQL Server.
Il dit à Entity Framework : Voici mes tables, voici les relations entre elles, voici les règles de suppression, et voici les colonnes qui doivent être uniques.
Une entity, c’est une classe C# que Entity Framework utilise comme modèle pour une table de la base de données. User est une entity
*/
using Microsoft.EntityFrameworkCore;//Entity Framework Core permet à C# de parler avec la base de données sans écrire directement beaucoup de SQL.
using backend.Models;//permet d'utiliser les tables User, Team, Match...

namespace backend.Data
{
    public class AppDbContext : DbContext //cette classe represente la db de mon code C#
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }//Crée ou utilise une table Users, où chaque ligne respecte la structure de l’entity User.
        public DbSet<Team> Teams { get; set; }
        public DbSet<TeamMember> TeamMembers { get; set; }
        public DbSet<Sport> Sports { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Match> Matches { get; set; }
        public DbSet<MatchParticipant> MatchParticipants { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)//Cette méthode sert à configurer les règles avancées de la base de données.
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)//user a un email unique
                .IsUnique();

            modelBuilder.Entity<Sport>()//sport a un name unique
                .HasIndex(s => s.Name)
                .IsUnique();

            modelBuilder.Entity<City>()
                .HasIndex(c => c.Name)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasOne(u => u.City)//user a une city
                .WithMany(c => c.Users)//city a plusieur users
                .HasForeignKey(u => u.CityId)//users contient un cle etrangere cityId
                .OnDelete(DeleteBehavior.SetNull);//Si on supprime une ville, on ne supprime pas les utilisateurs. On met juste leur CityId à null.

            modelBuilder.Entity<Match>()
                .HasOne(m => m.Sport)
                .WithMany(s => s.Matches)
                .HasForeignKey(m => m.SportId)
                .OnDelete(DeleteBehavior.Restrict);//Tu ne peux pas supprimer un sport s’il est utilisé par un match.

            modelBuilder.Entity<Match>()
                .HasOne(m => m.City)
                .WithMany(c => c.Matches)
                .HasForeignKey(m => m.CityId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Match>()
                .HasOne(m => m.CreatedByUser)
                .WithMany(u => u.CreatedMatches)
                .HasForeignKey(m => m.CreatedBy)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<MatchParticipant>()
                .HasIndex(mp => new { mp.MatchId, mp.UserId })
                .IsUnique();

            modelBuilder.Entity<MatchParticipant>()
                .HasOne(mp => mp.Match)
                .WithMany(m => m.Participants)
                .HasForeignKey(mp => mp.MatchId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<MatchParticipant>()
                .HasOne(mp => mp.User)
                .WithMany(u => u.MatchParticipants)
                .HasForeignKey(mp => mp.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Team>()
                .HasOne(t => t.Sport)
                .WithMany(s => s.Teams)
                .HasForeignKey(t => t.SportId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Team>()
                .HasOne(t => t.City)
                .WithMany(c => c.Teams)
                .HasForeignKey(t => t.CityId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Team>()
                .HasOne(t => t.CreatedByUser)
                .WithMany(u => u.CreatedTeams)
                .HasForeignKey(t => t.CreatedBy)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TeamMember>()
                .HasIndex(tm => new { tm.TeamId, tm.UserId })//Le même user ne peut pas participer deux fois au même match.
                .IsUnique();

            modelBuilder.Entity<TeamMember>()
                .HasOne(tm => tm.Team)
                .WithMany(t => t.Members)
                .HasForeignKey(tm => tm.TeamId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<TeamMember>()
                .HasOne(tm => tm.User)
                .WithMany(u => u.TeamMembers)
                .HasForeignKey(tm => tm.UserId)
                .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
