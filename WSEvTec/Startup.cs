using EvTec.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WSEvTec
{
    public class Startup
    {
        public readonly string Micors = "MiCors"; //añadir a cors

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WSEvTec", Version = "v1" });
            });

            //Establecer la conexón con la base de datos (capa)
            string conexion = @"Server=localhost;Database=EvTec;Trusted_Connection=True;";
            services.AddDbContext<EvTecContext>(options => options.UseSqlServer(conexion));

            //Agregar Cors
            services.AddCors(options =>
            {
                options.AddPolicy(name: Micors, builder =>
                {
                    builder.WithOrigins("*");
                    builder.WithHeaders("*");
                    builder.WithMethods("*");
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WSEvTec v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(Micors);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
