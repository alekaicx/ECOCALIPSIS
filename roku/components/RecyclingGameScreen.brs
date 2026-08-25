' =========================================================================
' Ecocalipsis - RecyclingGameScreen Controller (components/RecyclingGameScreen.brs)
' =========================================================================

sub init()
    m.gameTimer = m.top.findNode("gameTimer")
    m.hudScore = m.top.findNode("hudScore")
    m.hudLives = m.top.findNode("hudLives")
    m.hudStreak = m.top.findNode("hudStreak")
    m.fallingItemGroup = m.top.findNode("fallingItemGroup")
    m.itemIconLabel = m.top.findNode("itemIconLabel")
    m.itemNameLabel = m.top.findNode("itemNameLabel")
    m.catcherHighlight = m.top.findNode("catcherHighlight")
    m.feedbackLabel = m.top.findNode("feedbackLabel")
    m.gameOverModal = m.top.findNode("gameOverModal")
    m.finalScoreLabel = m.top.findNode("finalScoreLabel")
    m.gameOverButtons = m.top.findNode("gameOverButtons")

    m.laneX = [220, 690, 1160]
    m.currentLane = 1 ' Center (Verde)
    m.score = 0
    m.lives = 3
    m.streak = 1
    m.itemY = 120
    m.fallSpeed = 8

    m.items = [
        { name: "Botella Plástica", icon: "🧴", lane: 0 },
        { name: "Cáscara de Plátano", icon: "🍌", lane: 1 },
        { name: "Papel Higiénico", icon: "🧻", lane: 2 },
        { name: "Lata de Refresco", icon: "🥫", lane: 0 },
        { name: "Restos de Manzana", icon: "🍏", lane: 1 },
        { name: "Caja de Cartón Seca", icon: "📦", lane: 0 },
        { name: "Servilleta con Grasa", icon: "🏷️", lane: 2 },
        { name: "Envase de Vidrio", icon: "🫙", lane: 0 }
    ]
    m.currentItemIndex = 0

    m.gameTimer.observeField("fire", "onGameTick")
    m.gameOverButtons.observeField("buttonSelected", "onGameOverButtonClicked")

    StartNewGame()
    m.top.setFocus(true)
end sub

sub StartNewGame()
    m.score = 0
    m.lives = 3
    m.streak = 1
    m.fallSpeed = 8
    m.currentLane = 1
    m.gameOverModal.visible = false
    m.feedbackLabel.text = ""

    UpdateHud()
    UpdateCatcherPosition()
    SpawnNextItem()
    m.gameTimer.control = "start"
end sub

sub SpawnNextItem()
    m.itemY = 120
    m.currentItemIndex = Rnd(m.items.Count()) - 1
    if m.currentItemIndex < 0 then m.currentItemIndex = 0
    item = m.items[m.currentItemIndex]

    ' Target lane where item falls
    targetLane = item.lane
    m.fallingItemGroup.translation = [m.laneX[targetLane] + 100, m.itemY]
    m.itemIconLabel.text = item.icon
    m.itemNameLabel.text = item.name
end sub

sub onGameTick()
    m.itemY = m.itemY + m.fallSpeed
    item = m.items[m.currentItemIndex]
    targetLane = item.lane
    m.fallingItemGroup.translation = [m.laneX[targetLane] + 100, m.itemY]

    ' Collision check when item reaches bin height (Y >= 520)
    if m.itemY >= 520
        if m.currentLane = item.lane
            ' Correct Catch!
            earned = 10 * m.streak
            m.score = m.score + earned
            m.streak = m.streak + 1
            m.feedbackLabel.text = "¡EXCELENTE! +" + earned.ToStr() + " PTS"
            m.feedbackLabel.color = "0x34D399FF"

            ' Increase speed slightly every 50 points
            if m.score MOD 50 = 0 and m.fallSpeed < 18
                m.fallSpeed = m.fallSpeed + 1
            end if
        else
            ' Mistake!
            m.lives = m.lives - 1
            m.streak = 1
            m.feedbackLabel.text = "¡INCORRECTO! Esa caneca no corresponde."
            m.feedbackLabel.color = "0xEF4444FF"
        end if

        UpdateHud()

        if m.lives <= 0
            EndGame()
        else
            SpawnNextItem()
        end if
    end if
end sub

sub UpdateCatcherPosition()
    ' Update highlight selector
    m.catcherHighlight.translation = [m.laneX[m.currentLane] - 5, 555]
end sub

sub UpdateHud()
    m.hudScore.text = "Puntos: " + m.score.ToStr()
    m.hudStreak.text = "Racha: x" + m.streak.ToStr()

    livesStr = "Vidas: "
    for i = 1 to m.lives
        livesStr = livesStr + "❤️ "
    end for
    m.hudLives.text = livesStr
end sub

sub EndGame()
    m.gameTimer.control = "stop"
    m.finalScoreLabel.text = "Puntuación Obtenida: " + m.score.ToStr() + " Puntos"
    m.gameOverModal.visible = true
    m.gameOverButtons.setFocus(true)

    if m.score > 0
        m.top.scoreAwarded = m.score
    end if
end sub

sub onGameOverButtonClicked()
    idx = m.gameOverButtons.buttonSelected
    if idx = 0
        StartNewGame()
        m.top.setFocus(true)
    end if
end sub

function onKeyEvent(key as String, press as Boolean) as Boolean
    handled = false
    if press
        print "RecyclingGame onKeyEvent -> "; key

        if not m.gameOverModal.visible
            if key = "left"
                if m.currentLane > 0
                    m.currentLane = m.currentLane - 1
                    UpdateCatcherPosition()
                    handled = true
                end if
            else if key = "right"
                if m.currentLane < 2
                    m.currentLane = m.currentLane + 1
                    UpdateCatcherPosition()
                    handled = true
                end if
            else if key = "1"
                m.currentLane = 0
                UpdateCatcherPosition()
                handled = true
            else if key = "2"
                m.currentLane = 1
                UpdateCatcherPosition()
                handled = true
            else if key = "3"
                m.currentLane = 2
                UpdateCatcherPosition()
                handled = true
            end if
        end if
    end if
    return handled
end function
