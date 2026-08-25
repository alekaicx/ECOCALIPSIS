' =========================================================================
' EcoIA Background Async HTTP Task for Roku OS
' =========================================================================

sub init()
    m.top.functionName = "executeRequest"
end sub

sub executeRequest()
    m.top.isLoading = true
    userMsg = m.top.userMessage
    if userMsg = invalid or userMsg = ""
        userMsg = "¿Cómo reciclar en la escuela?"
    end if

    print "EcoIATask: sending message to AI: "; userMsg

    apiKey = "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"
    systemPrompt = "Eres EcoIA, la IA ecológica interactiva de la IED Pío X para Roku TV. Responde en 2 párrafos breves, alegres, con emojis ecológicos (🌿💧♻️🌳), aptos para niños y estudiantes de primaria y secundaria."

    http = CreateObject("roUrlTransfer")
    port = CreateObject("roMessagePort")
    http.SetMessagePort(port)
    http.SetUrl("https://openrouter.ai/api/v1/chat/completions")
    http.AddHeader("Authorization", "Bearer " + apiKey)
    http.AddHeader("Content-Type", "application/json")
    http.AddHeader("HTTP-Referer", "https://ecocalipsis-pio-x.app")
    http.AddHeader("X-Title", "Ecocalipsis Roku Channel")
    http.SetCertificatesFile("common:/certs/ca-bundle.crt")
    http.InitClientCertificates()

    reqBody = {
        "model": "cohere/north-mini-code:free",
        "messages": [
            { "role": "system", "content": systemPrompt },
            { "role": "user", "content": userMsg }
        ]
    }

    jsonPayload = FormatJson(reqBody)

    sent = http.AsyncPostFromString(jsonPayload)
    if sent
        msg = wait(7000, port)
        if type(msg) = "roUrlEvent"
            statusCode = msg.GetResponseCode()
            responseString = msg.GetString()
            print "EcoIATask: Status Code: "; statusCode

            if statusCode = 200 and responseString <> invalid and responseString <> ""
                parsed = ParseJson(responseString)
                if parsed <> invalid and parsed.choices <> invalid and parsed.choices.Count() > 0
                    reply = parsed.choices[0].message.content
                    m.top.apiResponse = reply
                    m.top.status = "success"
                    m.top.isLoading = false
                    return
                end if
            end if
        end if
    end if

    ' Fallback local intelligent response if offline or timed out
    m.top.apiResponse = GetLocalFallbackResponse(userMsg)
    m.top.status = "fallback"
    m.top.isLoading = false
end sub

function GetLocalFallbackResponse(query as String) as String
    q = LCase(query)
    if Instr(1, q, "recicl") > 0 or Instr(1, q, "caneca") > 0 or Instr(1, q, "plastico") > 0
        return "🌱 ¡En la IED Pío X reciclamos con el código nacional (Res. 2184)! \n* Caneca Blanca: Plásticos, vidrio, metal, papel y cartón limpios.\n* Caneca Verde: Residuos orgánicos.\n* Caneca Negra: No aprovechables.\n¡Separar nuestros residuos da vida a nuestro planeta! ♻️💚"
    else if Instr(1, q, "agua") > 0 or Instr(1, q, "sumapaz") > 0 or Instr(1, q, "paramo") > 0
        return "💧 ¡El Páramo de Sumapaz y sus frailejones son fábricas vivas de agua limpia! En el colegio y en casa, cierra la llave al enjabonarte y reporta cualquier fuga. ¡Cada gota es vida para Colombia! 🌊🌿"
    else if Instr(1, q, "lorax") > 0 or Instr(1, q, "arbol") > 0
        return "🌳 Como nos enseña El Lorax: 'A menos que alguien como tú se preocupe de verdad, nada va a mejorar, jamás.' Sembrar un árbol purifica el aire y da hogar a las aves. 🌼✨"
    else if Instr(1, q, "energia") > 0 or Instr(1, q, "luz") > 0
        return "⚡ ¡Apaga las luces y desconecta los cargadores que no estés utilizando! Evitar los 'vampiros eléctricos' ayuda a reducir el calentamiento global. 💡🌍"
    else
        return "🌿 ¡Hola! Soy EcoIA en tu Roku TV. Juntos podemos transformar la IED Pío X en un modelo ecológico de reciclaje, conservación del agua y siembra de vida. ¿Qué tema te gustaría aprender hoy? 🌳💧"
    end if
end function
