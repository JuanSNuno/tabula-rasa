package handlers

import (
	"tabula-rasa-backend/internal/core/ports"

	"github.com/gofiber/fiber/v2"
)

type HttpHandler struct {
	createSessionUseCase ports.CreateSessionUseCase
	verifyProofUseCase   ports.VerifyProofUseCase
	routeMessageUseCase  ports.RouteMessageUseCase
}

func NewHttpHandler(
	cs ports.CreateSessionUseCase,
	vp ports.VerifyProofUseCase,
	rm ports.RouteMessageUseCase,
) *HttpHandler {
	return &HttpHandler{
		createSessionUseCase: cs,
		verifyProofUseCase:   vp,
		routeMessageUseCase:  rm,
	}
}

func (h *HttpHandler) RegisterRoutes(app *fiber.App) {
	api := app.Group("/api/v1")

	api.Post("/session", h.CreateSession)
	api.Post("/verify", h.VerifyProof)
	api.Post("/messages", h.SendMessage)
	api.Get("/messages/:sessionId", h.GetMessages)
}

func (h *HttpHandler) CreateSession(c *fiber.Ctx) error {
	var req struct {
		PublicKey string `json:"publicKey"`
	}

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
	}

	session, err := h.createSessionUseCase.Execute(c.Context(), req.PublicKey)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusCreated).JSON(session)
}

func (h *HttpHandler) VerifyProof(c *fiber.Ctx) error {
	var req struct {
		SessionID    string `json:"sessionId"`
		ProofPayload string `json:"proofPayload"`
	}

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
	}

	isValid, err := h.verifyProofUseCase.Execute(c.Context(), req.SessionID, req.ProofPayload)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(fiber.Map{"verified": isValid})
}

func (h *HttpHandler) SendMessage(c *fiber.Ctx) error {
	var req struct {
		SessionID        string `json:"sessionId"`
		EncryptedPayload string `json:"encryptedPayload"`
	}

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
	}

	msg, err := h.routeMessageUseCase.SendMessage(c.Context(), req.SessionID, req.EncryptedPayload)
	if err != nil {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusCreated).JSON(msg)
}

func (h *HttpHandler) GetMessages(c *fiber.Ctx) error {
	sessionID := c.Params("sessionId")
	if sessionID == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Session ID is required"})
	}

	messages, err := h.routeMessageUseCase.GetMessages(c.Context(), sessionID)
	if err != nil {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(messages)
}
