package sprint5

import (
	"context"
	"fmt"
	"math/rand"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
	domain "tabula-rasa-backend/internal/core/domain/sprint5"
	"tabula-rasa-backend/internal/core/services/sprint5"
)

type Sprint5Handler struct {
	srv *sprint5.Sprint5Service
}

func NewSprint5Handler(srv *sprint5.Sprint5Service) *Sprint5Handler {
	return &Sprint5Handler{srv: srv}
}

func (h *Sprint5Handler) RegisterRoutes(app *fiber.App) {
	// Middleware websocket update check
	app.Use("/ws", func(c *fiber.Ctx) error {
		if websocket.IsWebSocketUpgrade(c) {
			c.Locals("allowed", true)
			return c.Next()
		}
		return fiber.ErrUpgradeRequired
	})

	api := app.Group("/api/v1")
	ws := app.Group("/ws/v1")

	// TR-2 / TR-3
	api.Get("/identities/:id/portfolio", func(c *fiber.Ctx) error {
		id := c.Params("id")
		res, _ := h.srv.GetOrCreatePortfolio(c.Context(), id)
		return c.JSON(res)
	})

	api.Post("/identities/:id/dependents", func(c *fiber.Ctx) error {
		id := c.Params("id")
		var req domain.Dependent
		if err := c.BodyParser(&req); err != nil {
			return c.Status(400).JSON(fiber.Map{"err": "Invalid Body"})
		}
		res, _ := h.srv.AddDependent(c.Context(), id, req)
		return c.JSON(res)
	})

	// TR-26
	api.Post("/ops/identities/scaffold", func(c *fiber.Ctx) error {
		var req struct {
			Seed string `json:"seed"`
		}
		c.BodyParser(&req)
		res := h.srv.GenerateScaffold(context.Background(), req.Seed)
		return c.JSON(res)
	})

	// TR-24 WebSocket
	ws.Get("/ops/intel/poisoning", websocket.New(func(c *websocket.Conn) {
		defer c.Close()
		targets := []string{"INTERPOL_NODE_X", "EU_BORDER_DB", "NSA_SOCIAL_GRAPH", "CREDIT_BUREAU_7"}
		for i := 0; i < 120; i++ {
			target := targets[rand.Intn(len(targets))]
			recs := rand.Intn(1500) + 100
			rate := float64(recs) / 100.0 + (rand.Float64() * 5)
			
			msg := fmt.Sprintf(`{"log": "[INJECT] Sent %d fake entities to %s.", "target": "%s", "rate": %.2f, "progress": %d}`, 
			recs, target, target, rate, (i*100)/120)
			
			c.WriteMessage(websocket.TextMessage, []byte(msg))
			time.Sleep(time.Duration(rand.Intn(400)+100) * time.Millisecond) // Variable delay
		}
		c.WriteMessage(websocket.TextMessage, []byte(`{"log": "[COMPLETE] Maximum noise threshold reached. Identity hidden.", "target": "ALL", "rate": 0, "progress": 100}`))
	}))

	// TR-25 WebSocket
	ws.Get("/ops/extraction/proj-attacker", websocket.New(func(c *websocket.Conn) {
		defer c.Close()
		coverage := 0.0
		caged := 0
		for i := 0; i <= 200; i++ {
			// Simular subidas y bajadas
			if coverage < 100 {
				coverage += float64(rand.Intn(5)) + rand.Float64()
				if rand.Float64() > 0.8 && coverage > 10 { // Caída de señal aleatoria
					coverage -= float64(rand.Intn(10))
				}
			}
			if coverage > 100 {
				coverage = 100.0
			}
			
			// Si la cobertura supera umbrales, cega camaras
			if coverage > 20 && rand.Float64() > 0.7 {
				caged++
			}

			// Simular latencia y fuerza de la señal de jammer
			jammingPower := 50 + rand.Intn(150)
			
			msg := fmt.Sprintf(`{"coverage": %.1f, "camerasCaged": %d, "jammingPower": %d, "tick": %d}`, coverage, caged, jammingPower, i)
			c.WriteMessage(websocket.TextMessage, []byte(msg))
			
			time.Sleep(200 * time.Millisecond)
		}
	}))
}
