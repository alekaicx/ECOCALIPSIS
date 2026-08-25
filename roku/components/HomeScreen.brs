' =========================================================================
' Ecocalipsis - HomeScreen Controller (components/HomeScreen.brs)
' =========================================================================

sub init()
    m.heroButtons = m.top.findNode("heroButtons")
    m.activityButtons = m.top.findNode("activityButtons")

    m.heroButtons.observeField("buttonSelected", "onHeroButtonClicked")
    m.activityButtons.observeField("buttonSelected", "onActivityButtonClicked")

    ' Set initial focus to the Play Movie button
    m.heroButtons.setFocus(true)
end sub

sub onHeroButtonClicked()
    idx = m.heroButtons.buttonSelected
    if idx = 0
        m.top.actionRequested = "play_lorax"
    else if idx = 1
        m.top.actionRequested = "open_workshops"
    end if
end sub

sub onActivityButtonClicked()
    idx = m.activityButtons.buttonSelected
    if idx = 0
        m.top.actionRequested = "open_game"
    else if idx = 1
        m.top.actionRequested = "open_trivia"
    end if
end sub

function onKeyEvent(key as String, press as Boolean) as Boolean
    handled = false
    if press
        if key = "down"
            if m.heroButtons.hasFocus()
                m.activityButtons.setFocus(true)
                handled = true
            end if
        else if key = "up"
            if m.activityButtons.hasFocus()
                m.heroButtons.setFocus(true)
                handled = true
            end if
        end if
    end if
    return handled
end function
