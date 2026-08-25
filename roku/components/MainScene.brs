' =========================================================================
' Ecocalipsis - MainScene Controller (components/MainScene.brs)
' =========================================================================

sub init()
    m.topNavBar = m.top.findNode("topNavBar")
    m.screenContainer = m.top.findNode("screenContainer")
    m.userPointsLabel = m.top.findNode("userPointsLabel")
    m.toastGroup = m.top.findNode("toastGroup")
    m.toastText = m.top.findNode("toastText")

    ' Screen Stack for Back Navigation History
    m.screenStack = []
    m.currentScreenNode = invalid

    ' Profile Data
    m.studentProfile = LoadStudentProfile()
    UpdateProfileHeader()

    ' Set Observers for Top Navigation
    m.topNavBar.observeField("buttonSelected", "onNavButtonClicked")

    ' Load Initial Screen (Home)
    NavigateToScreen("home", true)
end sub

sub UpdateProfileHeader()
    if m.studentProfile <> invalid and m.userPointsLabel <> invalid
        m.userPointsLabel.text = "⭐ " + m.studentProfile.points.ToStr() + " Pts · " + m.studentProfile.grade
    end if
end sub

sub onNavButtonClicked()
    selectedIndex = m.topNavBar.buttonSelected
    if selectedIndex = 0
        NavigateToScreen("home")
    else if selectedIndex = 1
        NavigateToScreen("workshops")
    else if selectedIndex = 2
        NavigateToScreen("game")
    else if selectedIndex = 3
        NavigateToScreen("trivia")
    else if selectedIndex = 4
        NavigateToScreen("ecoia")
    else if selectedIndex = 5
        NavigateToScreen("stats")
    else if selectedIndex = 6
        NavigateToScreen("about")
    end if
end sub

sub NavigateToScreen(screenType as String, isRoot = false as Boolean, params = invalid as Object)
    print "MainScene: Navigating to screen -> "; screenType

    ' Remove previous screen
    if m.currentScreenNode <> invalid
        m.screenContainer.removeChild(m.currentScreenNode)
        m.currentScreenNode = invalid
    end if

    newScreen = invalid

    if screenType = "home"
        newScreen = CreateObject("roSGNode", "HomeScreen")
        newScreen.observeField("actionRequested", "onHomeActionRequested")
        m.topNavBar.buttonFocused = 0
    else if screenType = "workshops"
        newScreen = CreateObject("roSGNode", "WorkshopsScreen")
        newScreen.observeField("playVideoRequested", "onPlayVideoRequested")
        m.topNavBar.buttonFocused = 1
    else if screenType = "game"
        newScreen = CreateObject("roSGNode", "RecyclingGameScreen")
        newScreen.observeField("scoreAwarded", "onScoreAwarded")
        m.topNavBar.buttonFocused = 2
    else if screenType = "trivia"
        newScreen = CreateObject("roSGNode", "TriviaScreen")
        newScreen.observeField("scoreAwarded", "onScoreAwarded")
        m.topNavBar.buttonFocused = 3
    else if screenType = "ecoia"
        newScreen = CreateObject("roSGNode", "EcoIAScreen")
        m.topNavBar.buttonFocused = 4
    else if screenType = "stats"
        newScreen = CreateObject("roSGNode", "StatsScreen")
        m.topNavBar.buttonFocused = 5
    else if screenType = "about"
        newScreen = CreateObject("roSGNode", "AboutScreen")
        m.topNavBar.buttonFocused = 6
    else if screenType = "video"
        newScreen = CreateObject("roSGNode", "VideoPlayerScreen")
        if params <> invalid
            newScreen.workshopItem = params
        end if
        newScreen.observeField("videoFinished", "onVideoFinished")
    end if

    if newScreen <> invalid
        m.currentScreenNode = newScreen
        m.screenContainer.appendChild(newScreen)
        newScreen.setFocus(true)

        if not isRoot and screenType <> "home"
            m.screenStack.Push(screenType)
        else if screenType = "home"
            m.screenStack.Clear()
        end if
    end if
end sub

sub onHomeActionRequested(event as Object)
    action = event.getData()
    if action = "play_lorax"
        ' Direct launch to movie workshop
        workshops = GetWorkshopsData()
        NavigateToScreen("video", false, workshops[0])
    else if action = "open_workshops"
        NavigateToScreen("workshops")
    else if action = "open_game"
        NavigateToScreen("game")
    else if action = "open_trivia"
        NavigateToScreen("trivia")
    else if action = "open_ecoia"
        NavigateToScreen("ecoia")
    end if
end sub

sub onPlayVideoRequested(event as Object)
    workshopData = event.getData()
    NavigateToScreen("video", false, workshopData)
end sub

sub onVideoFinished()
    ShowToast("¡Taller completado! +30 Puntos Ecológicos")
    m.studentProfile.points = m.studentProfile.points + 30
    SaveStudentProfile(m.studentProfile)
    UpdateProfileHeader()
    NavigateToScreen("workshops")
end sub

sub onScoreAwarded(event as Object)
    pts = event.getData()
    if pts <> invalid and pts > 0
        m.studentProfile.points = m.studentProfile.points + pts
        SaveStudentProfile(m.studentProfile)
        UpdateProfileHeader()
        ShowToast("¡Genial! +" + pts.ToStr() + " Puntos para la IED Pío X")
    end if
end sub

sub ShowToast(message as String)
    if m.toastGroup <> invalid and m.toastText <> invalid
        m.toastText.text = message
        m.toastGroup.visible = true
        ' Simple auto-hide timer
        timer = CreateObject("roSGNode", "Timer")
        timer.duration = 3.5
        timer.repeat = false
        timer.observeField("fire", "hideToast")
        timer.control = "start"
    end if
end sub

sub hideToast()
    if m.toastGroup <> invalid
        m.toastGroup.visible = false
    end if
end sub

' Remote Control Key Event Handler (D-Pad, Back, Home)
function onKeyEvent(key as String, press as Boolean) as Boolean
    handled = false
    if press
        print "MainScene onKeyEvent -> "; key

        if key = "back"
            if m.screenStack.Count() > 0
                m.screenStack.Pop()
                if m.screenStack.Count() > 0
                    prevScreen = m.screenStack[m.screenStack.Count() - 1]
                    NavigateToScreen(prevScreen)
                else
                    NavigateToScreen("home", true)
                end if
                handled = true
            else
                ' Exit or stay at home
                handled = false
            end if
        else if key = "up"
            ' Give focus to top navigation bar if currently in subscreen
            if m.currentScreenNode <> invalid and not m.topNavBar.hasFocus()
                m.topNavBar.setFocus(true)
                handled = true
            end if
        else if key = "down"
            ' From top navigation bar, give focus back to active screen
            if m.topNavBar.hasFocus() and m.currentScreenNode <> invalid
                m.currentScreenNode.setFocus(true)
                handled = true
            end if
        end if
    end if
    return handled
end function
