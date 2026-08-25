' =========================================================================
' Ecocalipsis - EcoIAScreen Controller (components/EcoIAScreen.brs)
' =========================================================================

sub init()
    m.questionsList = m.top.findNode("questionsList")
    m.aiQueryHeader = m.top.findNode("aiQueryHeader")
    m.aiResponseText = m.top.findNode("aiResponseText")
    m.aiLoadingGroup = m.top.findNode("aiLoadingGroup")

    m.prompts = [
        "¿Cómo reciclar correctamente en la IED Pío X?",
        "¿Por qué es vital proteger el Páramo de Sumapaz y los frailejones?",
        "¿Qué mensaje y lección nos enseña la película El Lorax?",
        "¿Cómo podemos eliminar el consumo de vampiros eléctricos en el colegio y en la casa?",
        "¿Qué se debe hacer con el aceite de cocina usado para no contaminar el agua?",
        "¿Cuáles son los mejores hábitos para ahorrar 100 litros de agua al día?"
    ]

    m.questionsList.observeField("buttonSelected", "onQuestionSelected")

    ' Initial prompt
    AskEcoIA(m.prompts[0])
    m.questionsList.setFocus(true)
end sub

sub onQuestionSelected()
    idx = m.questionsList.buttonSelected
    if idx >= 0 and idx < m.prompts.Count()
        AskEcoIA(m.prompts[idx])
    end if
end sub

sub AskEcoIA(promptText as String)
    m.aiQueryHeader.text = "PREGUNTA: " + promptText
    m.aiLoadingGroup.visible = true
    m.aiResponseText.text = ""

    ' Create background task for async network request
    if m.ecoTask <> invalid
        m.ecoTask.control = "stop"
        m.ecoTask = invalid
    end if

    m.ecoTask = CreateObject("roSGNode", "EcoIATask")
    m.ecoTask.userMessage = promptText
    m.ecoTask.observeField("apiResponse", "onAiResponseReceived")
    m.ecoTask.control = "run"
end sub

sub onAiResponseReceived()
    if m.ecoTask <> invalid
        reply = m.ecoTask.apiResponse
        m.aiLoadingGroup.visible = false
        m.aiResponseText.text = reply
    end if
end sub
