' =========================================================================
' Ecocalipsis - WorkshopsScreen Controller (components/WorkshopsScreen.brs)
' =========================================================================

sub init()
    m.workshopList = m.top.findNode("workshopList")
    m.btnPlayCurrent = m.top.findNode("btnPlayCurrent")
    m.detailPoster = m.top.findNode("detailPoster")
    m.detailCategory = m.top.findNode("detailCategory")
    m.detailTitle = m.top.findNode("detailTitle")
    m.detailMeta = m.top.findNode("detailMeta")
    m.detailDescription = m.top.findNode("detailDescription")
    m.detailQuestions = m.top.findNode("detailQuestions")

    m.workshops = GetWorkshopsData()
    m.selectedWorkshopIndex = 0

    m.workshopList.observeField("buttonFocused", "onWorkshopFocused")
    m.workshopList.observeField("buttonSelected", "onWorkshopSelected")
    m.btnPlayCurrent.observeField("buttonSelected", "onPlayClicked")

    UpdateWorkshopDetails(0)
    m.workshopList.setFocus(true)
end sub

sub onWorkshopFocused()
    idx = m.workshopList.buttonFocused
    if idx >= 0 and idx < m.workshops.Count()
        m.selectedWorkshopIndex = idx
        UpdateWorkshopDetails(idx)
    end if
end sub

sub onWorkshopSelected()
    idx = m.workshopList.buttonSelected
    if idx >= 0 and idx < m.workshops.Count()
        m.top.playVideoRequested = m.workshops[idx]
    end if
end sub

sub onPlayClicked()
    if m.selectedWorkshopIndex >= 0 and m.selectedWorkshopIndex < m.workshops.Count()
        m.top.playVideoRequested = m.workshops[m.selectedWorkshopIndex]
    end if
end sub

sub UpdateWorkshopDetails(index as Integer)
    ws = m.workshops[index]
    if ws <> invalid
        m.detailPoster.uri = ws.thumbnail
        m.detailCategory.text = UCase(ws.category)
        m.detailTitle.text = ws.title
        m.detailMeta.text = "⏱ Duración: " + ws.duration + " · Nivel: " + ws.level
        m.detailDescription.text = ws.description

        qText = ""
        for i = 0 to ws.keyQuestions.Count() - 1
            qText = qText + (i + 1).ToStr() + ". " + ws.keyQuestions[i] + Chr(10)
        end for
        m.detailQuestions.text = qText
    end if
end sub

function onKeyEvent(key as String, press as Boolean) as Boolean
    handled = false
    if press
        if key = "right"
            if m.workshopList.hasFocus()
                m.btnPlayCurrent.setFocus(true)
                handled = true
            end if
        else if key = "left"
            if m.btnPlayCurrent.hasFocus()
                m.workshopList.setFocus(true)
                handled = true
            end if
        end if
    end if
    return handled
end function
