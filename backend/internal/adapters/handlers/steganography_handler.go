package handlers

import (
	"bytes"
	"encoding/binary"
	"math"
	"math/rand"

	"github.com/gofiber/fiber/v2"
)

// GetSteganographyAudio genera un archivo WAV con un mensaje oculto en los LSB (Least Significant Bits).
func (h *HttpHandler) GetSteganographyAudio(c *fiber.Ctx) error {
	// Mensaje secreto a ocultar
	secret := "https://tr-mixnet-v4.onion/gate|LG-ALPHA-99-CLEAN"
	
	// Configuración WAV
	sampleRate := 44100
	duration := 2 // segundos
	numSamples := sampleRate * duration
	
	// Crear buffer para el archivo WAV
	var buf bytes.Buffer
	
	// RIFF header
	buf.WriteString("RIFF")
	binary.Write(&buf, binary.LittleEndian, uint32(36+numSamples*2))
	buf.WriteString("WAVE")
	
	// fmt sub-chunk
	buf.WriteString("fmt ")
	binary.Write(&buf, binary.LittleEndian, uint32(16))
	binary.Write(&buf, binary.LittleEndian, uint16(1)) // PCM
	binary.Write(&buf, binary.LittleEndian, uint16(1)) // Mono
	binary.Write(&buf, binary.LittleEndian, uint32(sampleRate))
	binary.Write(&buf, binary.LittleEndian, uint32(sampleRate*2))
	binary.Write(&buf, binary.LittleEndian, uint16(2)) // Block align
	binary.Write(&buf, binary.LittleEndian, uint16(16)) // Bits per sample
	
	// data sub-chunk
	buf.WriteString("data")
	binary.Write(&buf, binary.LittleEndian, uint32(numSamples*2))
	
	// Generar ruido blanco + Mensaje en LSB
	secretBytes := []byte(secret)
	bitIndex := 0
	byteIndex := 0
	
	for i := 0; i < numSamples; i++ {
		// Generar una muestra de ruido (PCM 16-bit)
		sample := int16(rand.Intn(2000) - 1000)
		
		// Si aún tenemos bits por ocultar
		if byteIndex < len(secretBytes) {
			bit := (secretBytes[byteIndex] >> (7 - bitIndex)) & 1
			
			// Reemplazar el bit menos significativo
			if bit == 1 {
				sample |= 1
			} else {
				sample &= ^int16(1)
			}
			
			bitIndex++
			if bitIndex == 8 {
				bitIndex = 0
				byteIndex++
			}
		} else if byteIndex == len(secretBytes) {
			// Ocultar un terminador nulo para que el decodificador sepa dónde parar
			sample &= ^int16(1) 
			bitIndex++
			if bitIndex == 8 {
				byteIndex++ // Terminamos
			}
		}

		// Añadir un tono suave de 440Hz para que no sea solo ruido
		freq := 440.0
		sine := math.Sin(2 * math.Pi * freq * float64(i) / float64(sampleRate))
		combinedSample := sample + int16(sine*2000)
		
		binary.Write(&buf, binary.LittleEndian, combinedSample)
	}
	
	c.Set("Content-Type", "audio/wav")
	c.Set("Content-Disposition", "attachment; filename=\"intelligence_brief.wav\"")
	return c.Send(buf.Bytes())
}
