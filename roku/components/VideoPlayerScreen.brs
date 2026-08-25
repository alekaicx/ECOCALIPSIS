' =========================================================================
' Ecocalipsis - VideoPlayerScreen Controller (components/VideoPlayerScreen.brs)
' =========================================================================

sub init()
    m.videoPlayer = m.top.findNode("videoPlayer")
    m.titleOverlay = m.top.findNode("titleOverlay")
    m.hudOverlay = m.top.findNode("hudOverlay")
    m.bufferingHud = m.top.findNode("bufferingHud")
    m.videoTitleLabel = m.top.findNode("videoTitleLabel")
    m.videoSubtitleLabel = m.top.findNode("videoSubtitleLabel")
    m.timePositionLabel = m.top.findNode("timePositionLabel")
    m.playbackStateLabel = m.top.findNode("playbackStateLabel")
    m.overlayTimer = m.top.findNode("overlayTimer")

    m.videoPlayer.observeField("state", "onVideoStateChanged")
    m.videoPlayer.observeField("position", "onPositionChanged")
    m.videoPlayer.observeField("duration", "onDurationChanged")
    m.overlayTimer.observeField("fire", "hideOverlays")

    m.videoPlayer.setFocus(true)
end sub

sub onWorkshopItemChanged()
    item = m.top.workshopItem
    if item <> invalid
        m.videoTitleLabel.text = item.title
        m.videoSubtitleLabel.text = item.subtitle + " · IED Pío X"

        ' Create SceneGraph Video ContentNode
        videoContent = CreateObject("roSGNode", "ContentNode")
        videoContent.url = item.videoUrl
        videoContent.title = item.title
        videoContent.streamformat = item.streamFormat
        videoContent.playstart = 0

        m.videoPlayer.content = videoContent
        m.videoPlayer.control = "play"

        ShowOverlays()
    end if
end sub

sub onVideoStateChanged()
    state = m.videoPlayer.state
    print "VideoPlayer state -> "; state

    if state = "playing"
        m.bufferingHud.visible = false
        m.playbackStateLabel.text = "▶ Reproduciendo"
        m.playbackStateLabel.color = "0x34D399FF"
        m.overlayTimer.control = "start"
    else if state = "paused"
        m.bufferingHud.visible = false
        m.playbackStateLabel.text = "⏸ En Pausa"
        m.playbackStateLabel.color = "0xFDE047FF"
        ShowOverlays()
        m.overlayTimer.control = "stop"
    else if state = "buffering"
        m.bufferingHud.visible = true
        m.playbackStateLabel.text = "⏳ Almacenando en búfer..."
        m.playbackStateLabel.color = "0x38BDF8FF"
    else if state = "finished"
        m.top.videoFinished = true
    else if state = "error"
        m.bufferingHud.visible = false
        m.playbackStateLabel.text = "⚠️ Error de red. Presiona BACK."
        m.playbackStateLabel.color = "0xEF4444FF"
        ShowOverlays()
    end if
end sub

sub onPositionChanged()
    pos = Int(m.videoPlayer.position)
    dur = Int(m.videoPlayer.duration)
    m.timePositionLabel.text = FormatSecondsToTime(pos) + " / " + FormatSecondsToTime(dur)
end sub

sub onDurationChanged()
    onPositionChanged()
end sub

sub ShowOverlays()
    m.titleOverlay.visible = true
    m.hudOverlay.visible = true
    m.overlayTimer.control = "stop"
    m.overlayTimer.control = "start"
end sub

sub hideOverlays()
    if m.videoPlayer.state = "playing"
        m.titleOverlay.visible = false
        m.hudOverlay.visible = false
    end if
end sub

function onKeyEvent(key as String, press as Boolean) as Boolean
    handled = false
    if press
        print "VideoPlayer onKeyEvent -> "; key
        ShowOverlays()

        if key = "play" or key = "OK"
            if m.videoPlayer.state = "playing"
                m.videoPlayer.control = "pause"
            else
                m.videoPlayer.control = "resume"
            end if
            handled = true
        else if key = "left" or key = "rewind"
            ' Seek backward 10s
            targetPos = m.videoPlayer.position - 10
            if targetPos < 0 then targetPos = 0
            m.videoPlayer.seek = targetPos
            handled = true
        else if key = "right" or key = "fastforward"
            ' Seek forward 10s
            targetPos = m.videoPlayer.position + 10
            if targetPos < m.videoPlayer.duration
                m.videoPlayer.seek = targetPos
            end if
            handled = true
        else if key = "back"
            ' Stop playback and exit screen
            m.videoPlayer.control = "stop"
            m.top.videoFinished = true
            handled = true
        end if
    end if
    return handled
end function
