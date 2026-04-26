package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/redis/go-redis/v9"

	"tabula-rasa-backend/internal/adapters/handlers"
	s5h "tabula-rasa-backend/internal/adapters/handlers/sprint5"
	"tabula-rasa-backend/internal/adapters/repositories"
	s5r "tabula-rasa-backend/internal/adapters/repositories/sprint5"
	"tabula-rasa-backend/internal/core/services"
	s5s "tabula-rasa-backend/internal/core/services/sprint5"
)

func main() {
	// 1. Configurar Redis (Storage Efímero)
	// Upstash proveerá la persistencia temporal.
	redisURL := os.Getenv("REDIS_URL")
	var opt *redis.Options
	var err error

	if redisURL != "" {
		opt, err = redis.ParseURL(redisURL)
		if err != nil {
			log.Fatalf("Error crítico: URL de Redis inválida: %v", err)
		}
	} else {
		opt = &redis.Options{
			Addr: "localhost:6379",
			DB:   0,
		}
	}

	redisClient := redis.NewClient(opt)

	if err := redisClient.Ping(context.Background()).Err(); err != nil {
		log.Fatalf("Error crítico: No se pudo conectar a Redis: %v. El sistema no puede operar sin Zero-Logs temporal.", err)
	}
	defer redisClient.Close()

	// 2. Inicializar Repositorios (Adaptadores de Datos)
	sessionRepo := repositories.NewRedisSessionRepository(redisClient)
	zkLogRepo := repositories.NewRedisZkLogRepository(redisClient)
	messageRepo := repositories.NewRedisMessageRepository(redisClient)

	// 3. Inicializar Casos de Uso (Lógica de Negocio Pura)
	createSessionUC := services.NewCreateSessionService(sessionRepo)
	verifyProofUC := services.NewVerifyProofService(sessionRepo, zkLogRepo)
	routeMessageUC := services.NewRouteMessageService(sessionRepo, messageRepo)
	grantAccessPassUC := services.NewGrantAccessPassService(sessionRepo)

	// 4. Inicializar HTTP Framework y Handlers (Adaptadores de Red)
	app := fiber.New(fiber.Config{
		DisableStartupMessage: true, // Modo clandestino
	})

	// Middleware
	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*", // Ajustar para MVP
	}))

	// Montar rutas
	httpHandler := handlers.NewHttpHandler(createSessionUC, verifyProofUC, routeMessageUC, grantAccessPassUC)
	httpHandler.RegisterRoutes(app)

	// Montar rutas Sprint 5
	s5repo := s5r.NewRedisSprint5Repo(redisClient)
	s5service := s5s.NewSprint5Service(s5repo)
	s5handler := s5h.NewSprint5Handler(s5service)
	s5handler.RegisterRoutes(app)

	// 5. Arranque y Graceful Shutdown
	go func() {
		port := os.Getenv("PORT")
		if port == "" {
			port = "8080"
		}
		log.Printf("[SISTEMA CLANDESTINO ONLINE] - Escuchando en :%s\n", port)
		if err := app.Listen(":" + port); err != nil {
			log.Panicf("Error arrancando servidor: %v", err)
		}
	}()

	// Esperar señal de interrupción para apagar limpiamente
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("[APAGADO DE EMERGENCIA] - Destruyendo conexiones en curso...")
	_ = app.Shutdown()
	log.Println("Servidor detenido.")
}