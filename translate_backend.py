import os
import glob

files = glob.glob('backend/internal/**/*.go', recursive=True)
translations = {
    "Invalid request payload": "Carga útil de solicitud inválida",
    "Internal server error": "Error interno del servidor",
    "Missing Authorization header": "Falta el encabezado de Autorización",
    "Invalid token format": "Formato de token inválido",
    "Invalid or expired token": "Token inválido o expirado",
    "Evacuation sequence initiated": "Secuencia de evacuación iniciada",
    "Emergency protocol activated": "Protocolo de emergencia activado",
    "Extraction route planned": "Ruta de extracción planeada",
    "Data purged": "Datos purgados",
    "Session created": "Sesión creada",
    "Message sent": "Mensaje enviado",
    "Failed to send message": "Falló al enviar mensaje",
    "Unauthorized": "No autorizado",
    "Forbidden": "Prohibido",
    "Not Found": "No encontrado",
}

for f in files:
    try:
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        original_content = content
        for eng, span in translations.items():
            content = content.replace('"' + eng + '"', '"' + span + '"')
        
        if content != original_content:
            with open(f, 'w', encoding='utf-8') as file:
                file.write(content)
            print(f'Translated strings in {f}')
    except Exception as e:
        pass
