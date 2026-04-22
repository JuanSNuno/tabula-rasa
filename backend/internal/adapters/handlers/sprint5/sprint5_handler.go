package sprint5

import (
	"context"
	"fmt"
	"math/rand"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
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
		var req struct {
			Name string `json:"name"`
		}
		if err := c.BodyParser(&req); err != nil {
			return c.Status(400).JSON(fiber.Map{"err": "Invalid Body"})
		}
		res, _ := h.srv.AddDependent(c.Context(), id, req.Name)
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
		for i := 0; i < 20; i++ {
			msg := fmt.Sprintf("[INJECTION] %d fake records sent to ID DB...", rand.Intn(500))
			c.WriteMessage(websocket.TextMessage, []byte(msg))
			time.Sleep(500 * time.Millisecond)
		}
		c.WriteMessage(websocket.TextMessage, []byte("[COMPLETE] Node corrupted."))
	}))

	// TR-25 WebSocket
	ws.Get("/ops/extraction/proj-attacker", websocket.New(func(c *websocket.Conn) {
		defer c.Close()
		for i := 0; i <= 100; i += 10 {
			msg := fmt.Sprintf(`{"coverage": %d, "camerasCaged": %d}`, i, i/10)
			c.WriteMessage(websocket.TextMessage, []byte(msg))
			time.Sleep(300 * time.Millisecond)
		}
	}))
}
