' =========================================================================
' Ecocalipsis - TriviaScreen Controller (components/TriviaScreen.brs)
' =========================================================================

sub init()
    m.triviaProgressLabel = m.top.findNode("triviaProgressLabel")
    m.triviaScoreLabel = m.top.findNode("triviaScoreLabel")
    m.questionTextLabel = m.top.findNode("questionTextLabel")
    m.optionsButtonGroup = m.top.findNode("optionsButtonGroup")
    m.feedbackGroup = m.top.findNode("feedbackGroup")
    m.feedbackStatusLabel = m.top.findNode("feedbackStatusLabel")
    m.feedbackExplanationLabel = m.top.findNode("feedbackExplanationLabel")
    m.btnNextQuestion = m.top.findNode("btnNextQuestion")

    m.questions = GetTriviaQuestions()
    m.currentQuestionIndex = 0
    m.triviaScore = 0
    m.answeredCurrent = false

    m.optionsButtonGroup.observeField("buttonSelected", "onOptionSelected")
    m.btnNextQuestion.observeField("buttonSelected", "onNextQuestionClicked")

    LoadQuestion(0)
    m.optionsButtonGroup.setFocus(true)
end sub

sub LoadQuestion(index as Integer)
    m.answeredCurrent = false
    m.feedbackGroup.visible = false

    if index < m.questions.Count()
        q = m.questions[index]
        m.triviaProgressLabel.text = "PREGUNTA " + (index + 1).ToStr() + " DE " + m.questions.Count().ToStr()
        m.triviaScoreLabel.text = "⭐ Puntos Trivia: " + m.triviaScore.ToStr()
        m.questionTextLabel.text = q.question

        opt0 = m.optionsButtonGroup.findNode("opt0")
        opt1 = m.optionsButtonGroup.findNode("opt1")
        opt2 = m.optionsButtonGroup.findNode("opt2")
        opt3 = m.optionsButtonGroup.findNode("opt3")

        if opt0 <> invalid and q.options.Count() > 0 then opt0.text = q.options[0]
        if opt1 <> invalid and q.options.Count() > 1 then opt1.text = q.options[1]
        if opt2 <> invalid and q.options.Count() > 2 then opt2.text = q.options[2]
        if opt3 <> invalid and q.options.Count() > 3 then opt3.text = q.options[3]

        m.optionsButtonGroup.setFocus(true)
    else
        ' Completed Trivia!
        m.triviaProgressLabel.text = "¡TRIVIA COMPLETADA CON ÉXITO!"
        m.questionTextLabel.text = "¡Felicitaciones! Has demostrado ser un verdadero Guardián Ecológico de la IED Pío X. Obtuviste " + m.triviaScore.ToStr() + " puntos."
        m.optionsButtonGroup.visible = false

        if m.triviaScore > 0
            m.top.scoreAwarded = m.triviaScore
        end if
    end if
end sub

sub onOptionSelected()
    if m.answeredCurrent then return
    m.answeredCurrent = true

    selectedIndex = m.optionsButtonGroup.buttonSelected
    q = m.questions[m.currentQuestionIndex]

    if selectedIndex = q.correctIndex
        m.triviaScore = m.triviaScore + 20
        m.feedbackStatusLabel.text = "¡RESPUESTA CORRECTA! (+20 Pts)"
        m.feedbackStatusLabel.color = "0x34D399FF"
    else
        m.feedbackStatusLabel.text = "RESPUESTA INCORRECTA (Revisa la explicación)"
        m.feedbackStatusLabel.color = "0xF87171FF"
    end if

    m.feedbackExplanationLabel.text = q.explanation
    m.feedbackGroup.visible = true
    m.btnNextQuestion.setFocus(true)
    m.triviaScoreLabel.text = "⭐ Puntos Trivia: " + m.triviaScore.ToStr()
end sub

sub onNextQuestionClicked()
    m.currentQuestionIndex = m.currentQuestionIndex + 1
    LoadQuestion(m.currentQuestionIndex)
end sub
